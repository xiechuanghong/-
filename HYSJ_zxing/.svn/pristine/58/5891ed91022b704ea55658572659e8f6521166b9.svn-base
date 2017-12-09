package com.hanyu.hysj.util;

import java.security.Key;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * 加密/解密算法 / 工作模式 / 填充方式
 * <p>
 * 算法：
 * 支持 DES、DESede(TripleDES,就是3DES)、AES、Blowfish、RC2、RC4(ARCFOUR)
 * DES                  key size must be equal to 56 (生成的密钥却是64位的，这是因为每8位中有1 位奇偶检验位)
 * Bouncy Castle 支持64bit密钥
 * DESede(TripleDES)    key size must be equal to 112 or 168
 * AES                  key size must be equal to 128, 192 or 256,but 192 and 256 bits may not be available
 * AES 只能使用 128 位的密钥，Oracle在其官方网站上提供了无政策限制权限文件，有了这个文件可以支持 192 和 256 位密钥
 * Blowfish             key size must be multiple of 8, and can only range from 32 to 448 (inclusive)
 * RC2                  key size must be between 40 and 1024 bits
 * RC4(ARCFOUR)         key size must be between 40 and 1024 bits
 * <p>
 * 工作模式，是指分组的块要经过哪些操作，还有就是结果的长度是否是块的整数倍
 * <p>
 * 填充方式：是指如果块的长度不够了，要怎么填充
 * <p>
 * 详见freemind笔记
 */
public abstract class DES {
    public static Key bytes2Key(String keyAlgorithm, byte[] key) throws Exception {
        DESKeySpec dks = new DESKeySpec(key);
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(keyAlgorithm);
        SecretKey secretKey = keyFactory.generateSecret(dks);
        return secretKey;
    }

    public static byte[] key2Bytes(Key key) {
        return key.getEncoded();
    }

    //根据给定的字节数组构造一个密钥
    public static Key getKey(byte[] privateKey, String algorithm) {
        return new SecretKeySpec(privateKey, algorithm);
    }

    public static Key getKey(String keyAlgorithm, int keysize, byte[] seed) throws Exception {
        KeyGenerator kg = KeyGenerator.getInstance(keyAlgorithm);
        SecureRandom secureRandom = null;
        if (seed != null) {
            secureRandom = new SecureRandom(seed);
        } else {
            secureRandom = new SecureRandom();
        }
        kg.init(keysize, secureRandom);
        return kg.generateKey();
    }

    public static Key getKey(String keyAlgorithm) throws Exception {
        KeyGenerator kg = KeyGenerator.getInstance(keyAlgorithm);
        return kg.generateKey();
    }

    public static byte[] encrypt(String cipherAlgorithm, Key key, byte[] data, byte[] ivParams) throws Exception {
        // 实例化
        Cipher cipher = Cipher.getInstance(cipherAlgorithm);

        // 初始化，设置为加密模式
        if (ivParams == null) {
            cipher.init(Cipher.ENCRYPT_MODE, key);
        } else {
            cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(ivParams));
        }

        // 执行操作
        return cipher.doFinal(data);
    }

    //初始化向量（IV:Initial Vector ）
    public static byte[] decrypt(String cipherAlgorithm, Key key, byte[] data, byte[] ivParams) throws Exception {
        // 实例化
        Cipher cipher = Cipher.getInstance(cipherAlgorithm);

        // 初始化，设置为解密模式
        if (ivParams == null) {
            cipher.init(Cipher.DECRYPT_MODE, key);
        } else {
            cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec(ivParams));
        }

        // 执行操作
        return cipher.doFinal(data);
    }
}
