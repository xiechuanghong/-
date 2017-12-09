#include <jni.h>

#ifndef _Included_test
#define _Included_test

#ifdef __cplusplus
extern "C" {
#endif
							   
JNIEXPORT jstring JNICALL Java_com_hanyu_hysj_util_AppUtils_k(JNIEnv *env, jclass clz, jobject context);
JNIEXPORT jstring JNICALL Java_com_hanyu_hysj_util_AppUtils_e(JNIEnv *env, jclass clz, jobject context, jstring info);
JNIEXPORT jstring JNICALL Java_com_hanyu_hysj_util_AppUtils_d(JNIEnv *env, jclass clz, jobject context, jstring info);

#ifdef __cplusplus
}
#endif

#endif
