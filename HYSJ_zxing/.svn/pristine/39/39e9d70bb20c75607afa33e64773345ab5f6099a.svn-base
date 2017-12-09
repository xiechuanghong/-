package com.hanyu.hysj.util;

import android.app.Activity;
import android.util.Log;

import com.socks.library.KLog;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Activity管理工具
 * 作者: LeiXiaoXing on 2016/9/28 11:09
 */

public class ActivityManager {
    private static ActivityManager manager;
    private List<Activity> activityList;

    private ActivityManager() {
        activityList = new ArrayList<>();
    }

    public static ActivityManager getIntence() {

        if (manager == null) {
            manager = new ActivityManager();
        }
        return manager;
    }

    /**
     * 添加Activity到管理工具
     *
     * @param activity
     */
    public void addActivity(Activity activity) {
        KLog.d(activity.getClass().getSimpleName());
        if (activityList != null) {
            activityList.add(activity);
        }
    }

    /**
     * 移除Activity
     *
     * @param activity
     */
    public void removeActivity(Activity activity) {
        if (activityList != null && activityList.contains(activity)) {
            activityList.remove(activity);
        }
    }


    public void removeActivity1(String str) {
        Iterator iterator = activityList.iterator();
        while (iterator.hasNext()) {
            Activity activity = (Activity) iterator.next();
            if (str.equals(activity.getClass().getSimpleName())) {
                activity.finish();
                iterator.remove();
            }
        }
    }

    /**
     * 结束所有Activity
     */
    public void finishAllActivity() {
        for (Activity activity : activityList) {
            Log.d("lbx", "activity:" + activity);
            if (activity != null) {
                activity.finish();
            }
        }
    }
}
