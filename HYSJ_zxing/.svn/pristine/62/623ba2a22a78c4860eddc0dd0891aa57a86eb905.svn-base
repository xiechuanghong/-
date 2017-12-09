#include <stdio.h>
#include <stdlib.h>
#include <android/Log.h>
#include <stdarg.h>

//#define DEBUG
#ifdef DEBUG
    #define LOGI(...)  __android_log_print(ANDROID_LOG_INFO,LOG_TAG,__VA_ARGS__)
    #define LOGE(...)  __android_log_print(ANDROID_LOG_ERROR,LOG_TAG,__VA_ARGS__)
    #define LOG_TAG    "wwp"
#else    
    #define LOGI(...)
    #define LOGE(...)
#endif