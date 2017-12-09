package com.hyphenate.easeui.utils;

import android.content.Context;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.hyphenate.easeui.R;
import com.hyphenate.easeui.controller.EaseUI;
import com.hyphenate.easeui.controller.EaseUI.EaseUserProfileProvider;
import com.hyphenate.easeui.domain.EaseUser;

public class EaseUserUtils {
    
    static EaseUserProfileProvider userProvider;
    
    static {
        userProvider = EaseUI.getInstance().getUserProfileProvider();
    }
    
    /**
     * get EaseUser according username
     * @param username
     * @return
     */
    public static EaseUser getUserInfo(String username){
        if(userProvider != null)
            return userProvider.getUser(username);
        return null;
    }
    
    /**
     * set user avatar
     * @param username
     */
    public static void setUserAvatar(Context context, String username, ImageView imageView){
    	EaseUser user = getUserInfo(username);
        if(user != null && user.getAvatar() != null){
//            try {
//                int avatarResId = Integer.parseInt(user.getAvatar());
//                Glide.with(context).load(avatarResId).into(imageView);
//            } catch (Exception e) {
                //use default avatar
                Glide.with(context).load(user.getAvatar()).error(R.drawable.ease_default_avatar).into(imageView);
//            }
        }else{
            Glide.with(context).load(R.drawable.ease_default_avatar).into(imageView);
        }
    }

    /**
     * set user avatar
     * @param username
     */
    public static void setUserDetail(Context context, String username, ImageView imageView ,TextView textView){
        EaseUser user = getUserInfo(username);
        if(user != null && user.getNick() != null){
            if (context == null)
                return;
            textView.setText(user.getNick());
            Glide.with(context).load(user.getAvatar()).error(R.drawable.ease_default_avatar).into(imageView);
        }else{
            textView.setText(username);
            Glide.with(context).load(R.drawable.ease_default_avatar).into(imageView);
        }
    }
    
    /**
     * set user's nickname
     */
    public static void setUserNick(String username,TextView textView){
        if(textView != null){
        	EaseUser user = getUserInfo(username);
        	if(user != null && user.getNick() != null){
        		textView.setText(user.getNick());
        	}else{
        		textView.setText(username);
        	}
        }
    }
    
}
