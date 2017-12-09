package com.google.zxing.client.android.bitmap;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.google.zxing.BinaryBitmap;
import com.google.zxing.DecodeHintType;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.RGBLuminanceSource;
import com.google.zxing.Result;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeReader;

import java.util.Hashtable;

/**
 * 二维码扫描工具类
 */
public class DecodeUtils {
    //解析二维码图片工具类，使用yuv
    public static void analyzeBitmap(String path, AnalyzeCallback analyzeCallback) {
        //首先判断图片的大小,若图片过大,则执行图片的裁剪操作,防止OOM
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true; // 先获取原大小
        Bitmap bitmap = BitmapFactory.decodeFile(path, options);
        options.inJustDecodeBounds = false; // 获取新的大小

        int sampleSize = (int) (options.outHeight / (float) 400);
        if (sampleSize <= 0)
            sampleSize = 1;
        options.inSampleSize = sampleSize;
        bitmap = BitmapFactory.decodeFile(path, options);

        // 开始对图像资源解码
        try {
            MultiFormatReader multiFormatReader = new MultiFormatReader();
            Hashtable<DecodeHintType, Object> hints = new Hashtable<DecodeHintType, Object>();
            hints.put(DecodeHintType.CHARACTER_SET, "UTF8");    // 设置继续的字符编码格式为UTF8
            multiFormatReader.setHints(hints);
            Result rawResult = multiFormatReader.decodeWithState(new BinaryBitmap(new HybridBinarizer(new BitmapLuminanceSource(bitmap))));
            if (rawResult != null) {
                if (analyzeCallback != null) {
                    analyzeCallback.onAnalyzeSuccess(bitmap, rawResult.getText());
                    bitmap.recycle();
                }
            } else {
                if (analyzeCallback != null) {
                    analyzeCallback.onAnalyzeFailed();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            if (analyzeCallback != null) {
                analyzeCallback.onAnalyzeFailed();
            }
        }
    }

    //解析二维码图片工具类，使用rgb
    public static void analyzeBitmap2(String path, AnalyzeCallback analyzeCallback) {
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true; // 先获取原大小
        Bitmap bitmap = BitmapFactory.decodeFile(path, options);
        options.inJustDecodeBounds = false; // 获取新的大小

        int sampleSize = (int) (options.outHeight / (float) 400);
        if (sampleSize <= 0)
            sampleSize = 1;
        options.inSampleSize = sampleSize;
        bitmap = BitmapFactory.decodeFile(path, options);

        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        int[] data = new int[width * height];
        bitmap.getPixels(data, 0, width, 0, 0, width, height);
        RGBLuminanceSource source = new RGBLuminanceSource(width, height, data);

        // 开始对图像资源解码
        try {
            Hashtable<DecodeHintType, String> hints = new Hashtable<DecodeHintType, String>();
            hints.put(DecodeHintType.CHARACTER_SET, "utf-8"); // 设置二维码内容的编码
            QRCodeReader reader = new QRCodeReader();
            Result rawResult = reader.decode(new BinaryBitmap(new HybridBinarizer(source)), hints);
            if (rawResult != null) {
                if (analyzeCallback != null) {
                    analyzeCallback.onAnalyzeSuccess(bitmap, rawResult.getText());
                    bitmap.recycle();
                }
            } else {
                if (analyzeCallback != null) {
                    analyzeCallback.onAnalyzeFailed();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            if (analyzeCallback != null) {
                analyzeCallback.onAnalyzeFailed();
            }
        }
    }

    /**
     * 解析二维码结果
     */
    public interface AnalyzeCallback {
        public void onAnalyzeSuccess(Bitmap bitmap, String result);

        public void onAnalyzeFailed();
    }
}
