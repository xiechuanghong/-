package com.hanyu.hysj.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Md5Utils {
    /**
     * 加密字符串采用md5算法
     * @param text
     * @return
     */
    public static String encode(String text) {
        try {
            MessageDigest digest = MessageDigest.getInstance("md5");
            byte[] result = digest.digest(text.getBytes());
            StringBuffer sb = new StringBuffer();
            for (byte b : result) {
                String hex = Integer.toHexString(b & 0xff);//加密
                if (hex.length() == 1) {
                    sb.append("0");
                }
                sb.append(hex);
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "";//can't reach
        }
    }

    /**
     * 获取文件的md5值
     *
     * @param file
     * @return
     */
    public static String encodeFile(File file) {
        FileInputStream in;
        try {
            in = new FileInputStream(file);
            MessageDigest digester = MessageDigest.getInstance("MD5");
            byte[] bytes = new byte[8192];
            int byteCount;
            while ((byteCount = in.read(bytes)) > 0) {
                digester.update(bytes, 0, byteCount);
            }
            byte[] digest = digester.digest();
            StringBuffer sb = new StringBuffer();
            for (byte b : digest) {
                String hex = Integer.toHexString(b & 0xff);//加盐
                if (hex.length() == 1) {
                    sb.append("0");
                }
                sb.append(hex);
            }
            return sb.toString();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
}
