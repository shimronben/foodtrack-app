'use client';
import { useState } from 'react';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!loggedIn) {
    return (
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'linear-gradient(160deg,#1e3a8a 0%,#2563eb 50%,#6d28d9 100%)'}}>
        <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 32px 32px'}}>
          <div style={{width:84,height:84,background:'rgba(255,255,255,0.15)',border:'2px solid rgba(255,255,255,0.3)',borderRadius:26,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:900,color:'#fff',marginBottom:22}}>FT</div>
          <h1 style={{fontSize:40,fontWeight:900,color:'#fff',marginBottom:10,fontFamily:'sans-serif'}}>FoodTrack</h1>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.7)',textAlign:'center',lineHeight:1.65,maxWidth:240}}>Manage your meal card budget and never leave money on the table</p>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:32,width:'100%',maxWidth:290}}>
            {['Track your remaining balance daily','Get notified before budget resets','See your full spending history'].map((t,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.18)',borderRadius:12,padding:'11px 16px'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:['#60a5fa','#f472b6','#34d399'][i],flexShrink:0}}></div>
                <span style={{fontSize:13,color:'rgba(255,255,255,0.9)',fontWeight:600}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:'#fff',borderRadius:'32px 32px 0 0',padding:'30px 24px 44px',boxShadow:'0 -8px 40px rgba(0,0,0,0.18)'}}>
          <h2 style={{fontSize:22,fontWeight:800,marginBottom:5,fontFamily:'sans-serif'}}>Welcome back</h2>
          <p style={{fontSize:13,color:'#9397b0',marginBottom:22}}>Sign in to your account</p>
          <div style={{marginBottom:14}}>
            <label style={{display:'block',fontSize:11,fontWeight:700,color:'#4a4f6a',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.06em'}}>Email address</label>
            <input type="email" placeholder="you@company.com" style={{width:'100%',background:'#f0f4ff',border:'1.5px solid #dde3f5',borderRadius:12,fontSize:15,padding:'13px 14px',outline:'none',fontFamily:'sans-serif'}}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontSize:11,fontWeight:700,color:'#4a4f6a',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.06em'}}>Password</label>
            <input type="password" placeholder="••••••••" style={{width:'100%',background:'#f0f4ff',border:'1.5px solid #dde3f5',borderRadius:12,fontSize:15,padding:'13px 14px',outline:'none',fontFamily:'sans-serif'}}/>
          </div>
          <button onClick={()=>setLoggedIn(true)} style={{width:'100%',padding:15,borderRadius:14,border:'none',background:'#2563eb',color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer'}}>Sign In</button>
          <p style={{textAlign:'center',fontSize:13,color:'#9397b0',marginTop:16}}>First time? <span onClick={()=>setLoggedIn(true)} style={{color:'#2563eb',fontWeight:700,cursor:'pointer'}}>Set up your account →</span></p>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:'#f0f4ff',minHeight:'100vh',maxWidth:430,margin:'0 auto',fontFamily:'sans-serif'}}>
      {activeTab === 'dashboard' && (
        <div style={{padding:'20px 16px 90px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
            <div>
              <div style={{fontSize:12,color:'#9397b0',fontWeight:600,marginBottom:3}}>Good evening</div>
              <h2 style={{fontSize:22,fontWeight:800}}>Hey, Rami</h2>
            </div>
            <div style={{width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,#2563eb,#818cf8)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:16,color:'#fff'}}>R</div>
          </div>

          {/* Hero card */}
          <div style={{position:'relative',borderRadius:22,padding:'30px 20px',marginBottom:14,textAlign:'center',background:'#fff',boxShadow:'0 2px 16px rgba(37,99,235,0.08)'}}>
            <div style={{position:'absolute',inset:-3,borderRadius:24,background:'linear-gradient(135deg,#2563eb,#7c3aed,#db2777,#f59e0b,#10b981)',zIndex:0,borderRadius:24}}></div>
            <div style={{position:'relative',zIndex:1,background:'#fff',borderRadius:20,padding:'24px 16px'}}>
              <div style={{display:'inline-block',background:'#fef0f3',border:'1px solid #f5c2cc',borderRadius:99,padding:'4px 14px',fontSize:11,fontWeight:800,color:'#e03151',textTransform:'uppercase',letterSpacing:'0.09em',marginBottom:14}}>Action required today</div>
              <div style={{fontWeight:900,fontSize:64,color:'#e03151',lineHeight:1,marginBottom:10}}>₪ 90</div>
              <div style={{fontSize:14,color:'#4a4f6a',lineHeight:1.6}}>You must spend this on your <strong>Cibus</strong> card today — or the budget will be lost!</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
            {[['Monthly balance','₪ 329','of ₪ 900 total','#2563eb'],['Resets on','Aug 17','11 working days left','#1a1d2e'],['Spend today','₪ 90','or it will be gone','#e03151'],['Daily limit','₪ 90','max allowed','#1a1d2e']].map(([label,val,sub,color],i)=>(
              <div key={i} style={{background:'#fff',border:'1px solid #dde3f5',borderRadius:16,padding:16,boxShadow:'0 2px 16px rgba(37,99,235,0.08)'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#9397b0',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8}}>{label}</div>
                <div style={{fontWeight:900,fontSize:26,color,lineHeight:1}}>{val}</div>
                <div style={{fontSize:11,color:'#9397b0',marginTop:4}}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div style={{background:'#fff',border:'1px solid #dde3f5',borderRadius:18,padding:18,boxShadow:'0 2px 16px rgba(37,99,235,0.08)',marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:10}}>Monthly usage</div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#9397b0',fontWeight:600,marginBottom:8}}><span>₪ 571 spent</span><span>63%</span></div>
            <div style={{height:10,background:'#f0f4ff',borderRadius:99,overflow:'hidden',border:'1px solid #dde3f5'}}><div style={{width:'63%',height:'100%',borderRadius:99,background:'linear-gradient(90deg,#2563eb,#818cf8)'}}></div></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,fontWeight:600,marginTop:6}}><span style={{color:'#1daa6e'}}>₪ 329 remaining</span><span style={{color:'#9397b0'}}>₪ 900 budget</span></div>
          </div>

          {/* History */}
          <div style={{fontSize:16,fontWeight:800,marginBottom:12}}>August spending history</div>
          <div style={{background:'linear-gradient(90deg,#eff4ff,#f5f0ff)',border:'1px solid #dde3f5',borderRadius:14,padding:'14px 16px',marginBottom:14,display:'flex',justifyContent:'space-between'}}>
            {[['16','Meals ordered','#2563eb'],['₪ 571','Total spent','#e03151'],['₪ 35.7','Avg per meal','#1daa6e']].map(([val,label,color],i)=>(
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontWeight:900,fontSize:20,color}}>{val}</div>
                <div style={{fontSize:11,color:'#9397b0',fontWeight:600,marginTop:2}}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:'1px solid #dde3f5',borderRadius:18,padding:'18px 18px 4px',boxShadow:'0 2px 16px rgba(37,99,235,0.08)'}}>
            {[['🍕','Pizza Hut','Aug 1, Wednesday','₪ 45',false],['🍣','Sushi Bar','Aug 2, Thursday','₪ 88',true],['🥗','Green Bowl','Jul 31, Tuesday','₪ 32',false],['🍔','Burger Brothers','Jul 30, Monday','₪ 55',false],['🌮','Taco House','Jul 29, Sunday','₪ 41',false],['🍜','Noodle Bar','Jul 28, Thursday','₪ 38',false],['🥙','Shawarma King','Jul 27, Wednesday','₪ 29',false]].map(([icon,name,date,amount,big],i,arr)=>(
              <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom: i<arr.length-1?'1px solid #dde3f5':'none'}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,borderRadius:12,background:'#eff4ff',border:'1px solid #dde3f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{icon}</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700}}>{name}</div>
                    <div style={{fontSize:11,color:'#9397b0',marginTop:2}}>{date}</div>
                  </div>
                </div>
                <div style={{fontWeight:900,fontSize:16,color:big?'#e03151':'#1a1d2e'}}>{amount}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div style={{padding:'20px 16px 90px'}}>
          <h2 style={{fontSize:24,fontWeight:800,marginBottom:5}}>Settings</h2>
          <p style={{fontSize:13,color:'#9397b0',marginBottom:18}}>Set up your food card details</p>
          <div style={{background:'#fff',border:'1px solid #dde3f5',borderRadius:18,padding:18,marginBottom:14}}>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:12}}>Card Type</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {['Cibus','10bis'].map((c,i)=>(
                <div key={i} style={{background: i===0?'#eff4ff':'#f0f4ff',border:`1.5px solid ${i===0?'#2563eb':'#dde3f5'}`,borderRadius:14,padding:14,textAlign:'center',cursor:'pointer'}}>
                  <div style={{fontSize:13,fontWeight:800,color:i===0?'#2563eb':'#1a1d2e'}}>{c}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'#fff',border:'1px solid #dde3f5',borderRadius:18,padding:18,marginBottom:14}}>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:14}}>Working Days</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:6}}>
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=>(
                <div key={i} style={{aspectRatio:'1',borderRadius:10,border:`1.5px solid ${[1,2,3,4].includes(i)?'#2563eb':'#dde3f5'}`,background:[1,2,3,4].includes(i)?'#2563eb':'#f0f4ff',color:[1,2,3,4].includes(i)?'#fff':'#9397b0',fontSize:10,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{d}</div>
              ))}
            </div>
          </div>
          <div style={{background:'#fff',border:'1px solid #dde3f5',borderRadius:18,padding:18,marginBottom:14}}>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:14}}>Budget</h3>
            {[['Monthly Budget','900'],['Daily Limit','90'],['Reset Day (1-31)','17']].map(([label,val],i)=>(
              <div key={i} style={{marginBottom: i<2?14:0}}>
                <label style={{display:'block',fontSize:11,fontWeight:700,color:'#4a4f6a',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.06em'}}>{label}</label>
                <input defaultValue={val} type="number" style={{width:'100%',background:'#f0f4ff',border:'1.5px solid #dde3f5',borderRadius:12,fontSize:15,padding:'13px 14px',outline:'none'}}/>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:'1px solid #dde3f5',borderRadius:18,padding:18,marginBottom:20}}>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:14}}>Notifications</h3>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <span style={{fontSize:14}}>Enable reminders</span>
              <div style={{width:48,height:26,background:'#2563eb',borderRadius:99,position:'relative',cursor:'pointer'}}><div style={{position:'absolute',width:20,height:20,background:'#fff',borderRadius:'50%',top:3,right:3,boxShadow:'0 1px 4px rgba(0,0,0,0.2)'}}></div></div>
            </div>
            <label style={{display:'block',fontSize:11,fontWeight:700,color:'#4a4f6a',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.06em'}}>Remind me at</label>
            <input type="time" defaultValue="20:00" style={{width:'100%',background:'#f0f4ff',border:'1.5px solid #dde3f5',borderRadius:12,fontSize:15,padding:'13px 14px',outline:'none'}}/>
          </div>
          <button style={{width:'100%',padding:15,borderRadius:14,border:'none',background:'#2563eb',color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer'}}>Save Changes</button>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div style={{padding:'20px 16px 90px'}}>
          <h2 style={{fontSize:24,fontWeight:800,marginBottom:5}}>Notification Preview</h2>
          <p style={{fontSize:13,color:'#9397b0',marginBottom:18}}>What Rami sees on his phone at 20:00</p>
          <div style={{background:'linear-gradient(160deg,#e8f0fe 0%,#ede9fe 50%,#fce7f3 100%)',borderRadius:18,padding:'22px 18px 18px',marginBottom:14,border:'1px solid #dde3f5'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:24}}>
              <div><div style={{fontWeight:900,fontSize:56,lineHeight:1}}>20:00</div><div style={{fontSize:14,fontWeight:600,color:'#4a4f6a',marginTop:4}}>Wednesday, Aug 2</div></div>
              <div style={{fontSize:12,color:'#4a4f6a',textAlign:'right'}}>WiFi<br/>84%</div>
            </div>
            <div style={{background:'rgba(255,255,255,0.88)',borderRadius:16,padding:14,display:'flex',gap:12}}>
              <div style={{width:42,height:42,background:'linear-gradient(135deg,#2563eb,#818cf8)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:13,color:'#fff',flexShrink:0}}>FT</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}><span style={{fontSize:12,fontWeight:800}}>FoodTrack</span><span style={{fontSize:11,color:'#9397b0'}}>now</span></div>
                <div style={{fontSize:13,color:'#4a4f6a',lineHeight:1.5}}>Rami, you must spend <strong style={{color:'#e03151'}}>₪ 90</strong> on your Cibus card today — or it will be lost!<span style={{display:'block',marginTop:3,color:'#9397b0',fontSize:11}}>Balance: ₪ 329 · Resets Aug 17</span></div>
                <div style={{display:'flex',gap:8,marginTop:10}}>
                  <button style={{flex:1,padding:8,borderRadius:8,fontSize:12,fontWeight:700,border:'none',background:'#f0f2f8',cursor:'pointer'}}>Dismiss</button>
                  <button style={{flex:1,padding:8,borderRadius:8,fontSize:12,fontWeight:700,border:'none',background:'#2563eb',color:'#fff',cursor:'pointer'}}>Order Now</button>
                </div>
              </div>
            </div>
          </div>
          <div style={{fontSize:12,fontWeight:800,color:'#9397b0',textTransform:'uppercase',letterSpacing:'0.07em',margin:'16px 0 10px'}}>When no action is needed</div>
          <div style={{background:'#edfaf4',border:'1.5px solid #b5ecd5',borderRadius:18,padding:18,display:'flex',alignItems:'center',gap:14}}>
            <div style={{fontSize:28,flexShrink:0}}>✓</div>
            <p style={{fontSize:13,color:'#4a4f6a',lineHeight:1.6}}><strong style={{color:'#1daa6e'}}>You are all good today!</strong><br/>No action needed — you will not lose any money.</p>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,background:'#fff',borderTop:'1px solid #dde3f5',height:70,display:'flex',alignItems:'center',justifyContent:'space-around',zIndex:100,boxShadow:'0 -4px 20px rgba(37,99,235,0.07)'}}>
        {[['dashboard','Dashboard','M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'],['settings','Settings','M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'],['alerts','Alerts','M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0']].map(([tab,label,path])=>(
          <button key={tab} onClick={()=>setActiveTab(tab)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,padding:'8px 20px',border:'none',background:'transparent',cursor:'pointer',color:activeTab===tab?'#2563eb':'#9397b0'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={path}/></svg>
            <span style={{fontSize:11,fontWeight:700}}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
```

Then save with **Ctrl + S**, and run in terminal:
```
git add .
git commit -m "add foodtrack UI"
git push