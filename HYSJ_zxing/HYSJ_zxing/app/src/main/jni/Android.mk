LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE    := hy
LOCAL_SRC_FILES := endec.cpp des.cpp base64.cpp md5.cpp
LOCAL_LDLIBS := -llog
include $(BUILD_SHARED_LIBRARY)
