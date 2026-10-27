// يقفل الاتجاه أفقيًا حقيقيًا (يدور الجهاز تلقائيًا) + ملء الشاشة
const fs=require('fs'),path=require('path');
const a=path.join(__dirname,'..','android/app/src/main');
const mf=path.join(a,'AndroidManifest.xml');let m=fs.readFileSync(mf,'utf8');
m=m.replace(/android:screenOrientation="[^"]*"\s*/g,'');
m=m.replace('<activity','<activity android:screenOrientation="sensorLandscape"');
fs.writeFileSync(mf,m);
const dir=path.join(a,'java/com/wallrace/game');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'MainActivity.java'),`package com.wallrace.game;
import android.os.Bundle;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;
public class MainActivity extends BridgeActivity {
  @Override public void onCreate(Bundle b){ super.onCreate(b); hide(); }
  @Override public void onWindowFocusChanged(boolean f){ super.onWindowFocusChanged(f); if(f) hide(); }
  private void hide(){
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
    WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
    c.hide(WindowInsetsCompat.Type.systemBars());
    c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
  }
}
`);
console.log('android patched');
