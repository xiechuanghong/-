#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <pthread.h>
#include <sys/ptrace.h>
#include <jni.h>
#include <assert.h>

#include "md5.h"
#include "des.h"
#include "log.h"
#include "base64.h"
#include "endec.h"

#define RELEASE_MD5  "AE98EC4937AE2667DF2C733A09E3C5DD"

jstring getSignature(JNIEnv *env, jobject context) {
    jclass clsContext = env->GetObjectClass(context);
    jmethodID pm_id = env->GetMethodID(clsContext, "getPackageManager", "()Landroid/content/pm/PackageManager;");
    jobject pm_obj = env->CallObjectMethod(context, pm_id);
    jclass pm_clazz = env->GetObjectClass(pm_obj);
// 得到 getPackageInfo 方法的 ID
    jmethodID package_info_id = env->GetMethodID(pm_clazz, "getPackageInfo", "(Ljava/lang/String;I)Landroid/content/pm/PackageInfo;");
    jclass clsContexts = env->GetObjectClass(context);
    jmethodID mId = env->GetMethodID(clsContexts, "getPackageName", "()Ljava/lang/String;");
    jstring pkg_str = static_cast<jstring>(env->CallObjectMethod(context, mId));
// 获得应用包的信息
    jobject pi_obj = env->CallObjectMethod(pm_obj, package_info_id, pkg_str, 64);
// 获得 PackageInfo 类
    jclass pi_clazz = env->GetObjectClass(pi_obj);
// 获得签名数组属性的 ID
    jfieldID signatures_fieldId = env->GetFieldID(pi_clazz, "signatures", "[Landroid/content/pm/Signature;");
    jobject signatures_obj = env->GetObjectField(pi_obj, signatures_fieldId);
    jobjectArray signaturesArray = (jobjectArray) signatures_obj;
    jsize size = env->GetArrayLength(signaturesArray);
    jobject signature_obj = env->GetObjectArrayElement(signaturesArray, 0);
    jclass signature_clazz = env->GetObjectClass(signature_obj);
    jmethodID string_id = env->GetMethodID(signature_clazz, "toCharsString", "()Ljava/lang/String;");
    jstring str = static_cast<jstring>(env->CallObjectMethod(signature_obj, string_id));
    return str;
}

//判断签名
//0,failue;1,sucess
int verify(unsigned char *sign) {
    int rst = 0;
    unsigned char *signMd5 = (unsigned char *) malloc(33);
    memset(signMd5, 0, 33);
    Md5CryptStr(sign, strlen((const char *) sign), signMd5); 
    LOGI("verify signMd5:%s", signMd5);
    if (strcmp((char *)signMd5, RELEASE_MD5) == 0) {
        rst = 1;
    }
    free(signMd5);
    return rst;
}

//倒序字符串
void reverse_string(char* pData) {
    int length = strlen(pData);
    char data;
    int i;
    for(i=0; i<length/2; i++) {
        data = pData[i];
        pData[i] = pData[length-i-1];
        pData[length-i-1] = data;
    }
}

//md5
//调用后外边释放内存,free(md5)
unsigned char *md5_encode(const unsigned char *data){
    unsigned char *md5 = (unsigned char *)malloc(33);
    memset(md5, 0, 33);
    Md5CryptStr(data, strlen((const char *)data), md5);
    return md5;
}

unsigned char *des_encode(const unsigned char *in, const unsigned char key[8]){
    LOGI("des_encode in:%s %s", in, key);
    unsigned int inLen = strlen((const char *)in);
    unsigned int outLen = (inLen + 7)&0xFFFFFFF8;
    unsigned char *out = (unsigned char *)malloc(outLen + 1);
    memset(out, 0, outLen+1);
    CDesEnter(in, out, inLen, (unsigned char *) key, 0);
    return out;
}

unsigned char *des_decode(const unsigned char *in, const unsigned char key[8]){
    unsigned int inLen = strlen((const char *)in);
    unsigned char *out = (unsigned char *)malloc(inLen + 1);
    memset(out, 0, inLen+1);
    CDesEnter(in, out, inLen, (unsigned char *) key, 1);
    return out;
}

//md5(base64(reverse_string(sign)))
unsigned char * getkey(JNIEnv *env, jobject context) {
    unsigned char *md5Enc = NULL;

    //获取签名
    jstring strSign = getSignature(env, context);
    const char *sign = env->GetStringUTFChars(strSign, NULL);
    LOGI("sign:%s", sign);
    if(verify((unsigned char *)sign)){
        reverse_string((char*)sign);
        LOGI("reverse_string sign:%s", sign);

        unsigned int base64EncLen = 0;
        unsigned char *base64Enc = base64_encode((const unsigned char *)sign, strlen(sign), &base64EncLen);
        LOGI("base64Enc:%s", base64Enc);

        md5Enc = md5_encode(base64Enc);
        LOGI("md5Enc:%s", md5Enc);

        free(base64Enc);
    }
    env->ReleaseStringUTFChars(strSign, sign);
    return md5Enc;
}

//base64_encode(des(in,key))
unsigned char * encode(JNIEnv *env, jobject context, const unsigned char *in) {
    unsigned char * key = getkey(env, context);
    unsigned char *desEnc = des_encode(in, getkey(env, context));
    unsigned int base64EncLen = 0;
    unsigned char *base64Enc = base64_encode((const unsigned char *)desEnc, strlen((const char *)desEnc), &base64EncLen);
    LOGI("encode:%s", base64Enc);
    free(desEnc);
    return base64Enc;
}

unsigned char * decode(JNIEnv *env, jobject context, const unsigned char *in) {
    unsigned int base64DecLen = 0;
    unsigned char *base64Dec = base64_decode(in, strlen((const char *)in), &base64DecLen);
    unsigned char *desDec = des_decode(base64Dec, getkey(env, context));
    printf("decode:%s\n",desDec);
    free(base64Dec);
    return desDec;
}

//des(base64_decode(in),key)
JNIEXPORT jstring JNICALL Java_com_hanyu_hysj_util_AppUtils_k(
        JNIEnv *env, jclass clz, jobject context) {
    jstring key;

    //获取签名
    jstring strSign = getSignature(env, context);
    const char *sign = env->GetStringUTFChars(strSign, NULL);
    LOGI("sign:%s", sign);
    if(verify((unsigned char *)sign)){
        reverse_string((char*)sign);
        LOGI("reverse_string sign:%s", sign);

        unsigned int base64EncLen = 0;
        unsigned char *base64Enc = base64_encode((const unsigned char *)sign, strlen(sign), &base64EncLen);
        LOGI("base64Enc:%s", base64Enc);

        unsigned char *md5Enc = md5_encode(base64Enc);
        LOGI("md5Enc:%s", md5Enc);
        key = (env)->NewStringUTF((const char*)md5Enc);
        free(md5Enc);

        free(base64Enc);
    }else{
        key = (env)->NewStringUTF("error");
    }
    env->ReleaseStringUTFChars(strSign, sign);
    return key;
}

JNIEXPORT jstring JNICALL Java_com_hanyu_hysj_util_AppUtils_e(
        JNIEnv *env, jclass clz, jobject context, jstring info) {
    const char *in = env->GetStringUTFChars(info, NULL);
    unsigned char * enc = encode(env, context, (const unsigned char *)in);
    jstring rst = (env)->NewStringUTF((const char*)enc);
    env->ReleaseStringUTFChars(info, in);
    return rst;
}

JNIEXPORT jstring JNICALL Java_com_hanyu_hysj_util_AppUtils_d(
        JNIEnv *env, jclass clz, jobject context, jstring info) {
    const char *in = env->GetStringUTFChars(info, NULL);
    unsigned char * dec = decode(env, context, (const unsigned char *)in);
    jstring rst = (env)->NewStringUTF((const char*)dec);
    env->ReleaseStringUTFChars(info, in);
    return rst;
}





