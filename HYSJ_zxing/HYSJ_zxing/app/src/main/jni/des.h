/*
*CDesEnter函数说明：
*      des加密/解密入口
*  返回：
*      1成功,0失败
*  参数：
*      in  需要加密或解密的数据
*          注意：in缓冲区的大小必须和datalen相同.
*      out 加密后或解密后输出。
*          注意：out缓冲区大小必须是8的倍数而且比datalen大或者相等。
*          如datalen=7，out缓冲区的大小应该是8，datalen=8,out缓冲区的大小应该是8,
*          datalen=9,out缓冲区的大小应该是16，依此类推。
*      datalen 数据长度(字节)。
*          注意:datalen 必须是8的倍数。
*      key 8个字节的加密或解密的密码。
*      type 0表示加密 1表示解密
*/
bool CDesEnter(const unsigned char *in, unsigned char *out, int datalen, const unsigned char key[8], int type);
int CDesMac(const unsigned char *mac_data, unsigned char *mac_code, int datalen, const unsigned char key[8]);

#define PKCS5PADDING 1
#define ZERO_PADDING 2

//注：加密时，若使用PKCS5PADDING补位模式，则必须目标缓冲区长度必须为(源数据长度/8+1)*8
bool CDESEncrypt(const unsigned char *in, unsigned char *out, int datalen, const unsigned char key[8], bool boEncrypt, int iPaddingType);
