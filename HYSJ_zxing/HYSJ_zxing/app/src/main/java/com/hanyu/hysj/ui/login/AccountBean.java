package com.hanyu.hysj.ui.login;

import java.io.Serializable;

/**
 * Created by 冀毅 on 2017/3/6.
 * 用户名密码实体类
 */

public class AccountBean implements Serializable {
    private boolean isRemember;
    private String UserName;
    private String Password;
    private String version;

    public AccountBean(String userName, String password, String version) {
        UserName = userName;
        Password = password;
        this.version = version;
    }

    public boolean isRemember() {
        return isRemember;
    }

    public void setRemember(boolean remember) {
        isRemember = remember;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getUserName() {

        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }


    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
