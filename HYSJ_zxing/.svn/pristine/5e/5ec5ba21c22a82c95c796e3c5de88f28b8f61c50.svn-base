package com.hanyu.hysj.util;

import android.content.Context;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.RequestManager;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;
import com.hanyu.hysj.R;

public class ImageLoader {
    //默认图
    private static final int DEFAULT_IMAGE = R.mipmap.placeholder;
    //错误图
    private static final int ERROR_IMAGE = R.mipmap.placeholder;

    public static void loadImage(RequestManager glide, ImageView imageView, String url) {
        glide.load(url)//图片的url
                .centerCrop()//图片的显示方式。这里在是居中裁剪
                .placeholder(DEFAULT_IMAGE) //默认的占位图片
                .error(ERROR_IMAGE) //加载失败的图片
                .dontAnimate()
                .diskCacheStrategy(DiskCacheStrategy.ALL)//缓存策略
                .into(imageView);//加载
    }

    public static void loadBytes(RequestManager glide, String url, Target target) {
        glide.load(url)
                .asBitmap()
                .toBytes()
                .centerCrop()
                .into(target);
    }

    public static void loadBytes(RequestManager glide, int resId, Target target) {
        glide.load(resId)
                .asBitmap()
                .toBytes()
                .centerCrop()
                .into(target);
    }

    public static void loadToUrl(Context context, ImageView imageView, String url) {
        Glide.with(context).
                load(url)//图片的url
                .centerCrop()//图片的显示方式。这里在是居中裁剪
                .placeholder(DEFAULT_IMAGE) //默认的占位图片
                .error(ERROR_IMAGE) //加载失败的图片
                .dontAnimate()
                .diskCacheStrategy(DiskCacheStrategy.ALL)//缓存策略
                .into(imageView);//加载
    }

    public static void loadToUrl(Context context, ImageView imageView, int resId) {
        Glide.with(context).
                load(resId)//图片的url
                .centerCrop()//图片的显示方式。这里在是居中裁剪
                .placeholder(DEFAULT_IMAGE) //默认的占位图片
                .error(ERROR_IMAGE) //加载失败的图片
                .dontAnimate()
                .diskCacheStrategy(DiskCacheStrategy.ALL)//缓存策略
                .into(imageView);//加载
    }

    public static void loadToUrl(Context context, ImageView imageView, String url, RequestListener listener) {
        Glide.with(context).
                load(url)//图片的url
                .centerCrop()//图片的显示方式。这里在是居中裁剪
                .placeholder(DEFAULT_IMAGE) //默认的占位图片
                .error(ERROR_IMAGE) //加载失败的图片
                .dontAnimate()
                .diskCacheStrategy(DiskCacheStrategy.ALL)//缓存策略
                .listener(listener)
                .into(imageView);//加载
    }
}