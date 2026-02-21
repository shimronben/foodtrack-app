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
          <h1 style={{fontSize:40,fontWeight:900,color:'#fff',marginBottom:10,fontFamily:'sans-serif',margin:'0 0 10px 0'}}>FoodTrack</h1>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.7)',textAlign:'center',lineHeight:1.65,maxWidth:240}}>Manage your meal card budget and never leave money on the table</p>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:32,width:'100%',maxWidth:290}}>
            {['Track your remaining balance daily','Get notified before budget resets','See your full spending history'].map((t,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.18)',borderRadius:12,padding:'11px 16px'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:(['#60a5fa','#f472b6','#34d399'] as string[])[i],flexShrink:0}}></div>
                <span style={{fontSize:13,color:'rgba(255,255,255,0.9)',fontWeight:600}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:'#fff',borderRadius:'32px 32px 0 0',padding:'30px 24px 44px',boxShadow:'0 -8px 40px rgba(0,0,0,0.18)'}}>
          <h2 style={{fontSize:22,fontWeight:800,marginBottom:5,fontFamily:'sans-serif',color:'#1a1d2e'}}>Welcome back</h2>
          <p style={{fontSize:13,color:'#9397b0',marginBottom:22}}>Sign in to your account</p>
          <div style={{marginBottom:14}}>
            <label style={{display:'block',fontSize:11,fontWeight:700,color:'#4a4f6a',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.06em'}}>Email address</label>
            <input type="email" placeholder="you@company.com" style={{width:'100%',background:'#f0f4ff',border:'1.5px solid #dde3f5',borderRadius:12,fontSize:15,padding:'13px 14px',outline:'none',fontFamily:'sans-serif',color:'#1a1d2e'}}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontSize:11,fontWeight:700,color:'#4a4f6a',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.06em'}}>Password</label>
            <input type="password" placeholder="••••••••" style={{width:'100%',background:'#f0f4ff',border:'1.5px solid #dde3f5',borderRadius:12,fontSize:15,padding:'13px 14px',outline:'none',fontFamily:'sans-serif',color:'#1a1d2e'}}/>
          </div>
          <button onClick={()=>setLoggedIn(true)} style={{width:'100%',padding:15,borderRadius:14,border:'none',background:'#2563eb',color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer'}}>Sign In</button>
          <p style={{textAlign:'center',fontSize:13,color:'#9397b0',marginTop:16}}>First time? <span onClick={()=>setLoggedIn(true)} style={{color:'#2563eb',fontWeight:700,cursor:'pointer'}}>Set up your account</span></p>
        </div>
      </div>
    );
  }

  const tabs = [
    {id:'dashboard',label:'Dashboard',path:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'},
    {id:'settings',label:'Settings',path:'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'},
    {id:'alerts',label:'Alerts',path:'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0'},
  ];

  const meals = [
    {icon:'🍕',name:'Pizza Hut',date:'Aug 1, Wednesday',amount:45,big:false},
    {icon:'🍣',name:'Sushi Bar',date:'Aug 2, Thursday',amount:88,big:true},
    {icon:'🥗',name:'Green Bowl',date:'Jul 31, Tuesday',amount:32,big:false},
    {icon:'🍔',name:'Burger Brothers',date:'Jul 30, Monday',amount:55,big:false},
    {icon:'🌮',name:'Taco House',date:'Jul 29, Sunday',amount:41,big:false},
    {icon:'🍜',name:'Noodle Bar',date:'Jul 28, Thursday',amount:38,big:false},
    {icon:'🥙',name:'Shawarma King',date:'Jul 27, Wednesday',amount:29,big:false},
  ];

  const cardStyle = {background:'#fff',border:'1px solid #dde3f5',borderRadius:18,padding:18,marginBottom:14,boxShadow:'0 2px 16px rgba(37,99,235,0.08)'};
  const inputStyle = {width:'100%',background:'#f0f4ff',border:'1.5px solid #dde3f5',borderRadius:12,fontSize:15,padding:'13px 14px',outline:'none',color:'#1a1d2e',fontFamily:'sans-serif'} as React.CSSProperties;
  const labelStyle = {display:'block',fontSize:11,fontWeight:700,color:'#4a4f6a',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.06em'} as React.CSSProperties;
  const sectionTitleStyle = {fontSize:16,fontWeight:700,marginBottom:14,color:'#1a1d2e',fontFamily:'sans-serif'};

  return (
    <div style={{background:'#f0f4ff',minHeight:'100vh',maxWidth:430,margin:'0 auto',fontFamily:'sans-serif',color:'#1a1d2e'}}>

      {activeTab === 'dashboard' && (
        <div style={{padding:'20px 16px 90px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
            <div>
              <div style={{fontSize:12,color:'#9397b0',fontWeight:600,marginBottom:3}}>Good evening</div>
              <h2 style={{fontSize:22,fontWeight:800,color:'#1a1d2e',margin:0}}>Hey, Rami</h2>
            </div>
            <div style={{width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,#2563eb,#818cf8)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:16,color:'#fff'}}>R</div>
          </div>

          <div style={{borderRadius:22,padding:3,marginBottom:14,background:'linear-gradient(135deg,#2563eb,#7c3aed,#db2777,#f59e0b,#10b981)'}}>
            <div style={{background:'#fff',borderRadius:20,padding:'24px 16px',textAlign:'center'}}>
              <div style={{display:'inline-block',background:'#fef0f3',border:'1px solid #f5c2cc',borderRadius:99,padding:'4px 14px',fontSize:11,fontWeight:800,color:'#e03151',textTransform:'uppercase',letterSpacing:'0.09em',marginBottom:14}}>Action required today</div>
              <div style={{fontWeight:900,fontSize:64,color:'#e03151',lineHeight:1,marginBottom:10}}>{'\u20AA'} 90</div>
              <div style={{fontSize:14,color:'#4a4f6a',lineHeight:1.6}}>You must spend this on your <strong style={{color:'#1a1d2e'}}>Cibus</strong> card today or the budget will be lost!</div>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
            {[
              {label:'Monthly balance',val:`${'\u20AA'} 329`,sub:'of \u20AA 900 total',color:'#2563eb'},
              {label:'Resets on',val:'Aug 17',sub:'11 working days left',color:'#1a1d2e'},
              {label:'Spend today',val:`${'\u20AA'} 90`,sub:'or it will be gone',color:'#e03151'},
              {label:'Daily limit',val:`${'\u20AA'} 90`,sub:'max allowed',color:'#1a1d2e'},
            ].map((s,i)=>(
              <div key={i} style={{background:'#fff',border:'1px solid #dde3f5',borderRadius:16,padding:16,boxShadow:'0 2px 16px rgba(37,99,235,0.08)'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#9397b0',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8}}>{s.label}</div>
                <div style={{fontWeight:900,fontSize:26,color:s.color,lineHeight:1}}>{s.val}</div>
                <div style={{fontSize:11,color:'#9397b0',marginTop:4}}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{...cardStyle}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:10,color:'#1a1d2e'}}>Monthly usage</div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#9397b0',fontWeight:600,marginBottom:8}}>
              <span>{'\u20AA'} 571 spent</span><span>63%</span>
            </div>
            <div style={{height:10,background:'#f0f4ff',borderRadius:99,overflow:'hidden',border:'1px solid #dde3f5'}}>
              <div style={{width:'63%',height:'100%',borderRadius:99,background:'linear-gradient(90deg,#2563eb,#818cf8)'}}></div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,fontWeight:600,marginTop:6}}>
              <span style={{color:'#1daa6e'}}>{'\u20AA'} 329 remaining</span>
              <span style={{color:'#9397b0'}}>{'\u20AA'} 900 budget</span>
            </div>
          </div>

          <div style={{fontSize:16,fontWeight:800,marginBottom:12,color:'#1a1d2e'}}>August spending history</div>
          <div style={{background:'linear-gradient(90deg,#eff4ff,#f5f0ff)',border:'1px solid #dde3f5',borderRadius:14,padding:'14px 16px',marginBottom:14,display:'flex',justifyContent:'space-between'}}>
            {[{val:'16',label:'Meals ordered',color:'#2563eb'},{val:`${'\u20AA'} 571`,label:'Total spent',color:'#e03151'},{val:`${'\u20AA'} 35.7`,label:'Avg per meal',color:'#1daa6e'}].map((s,i)=>(
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontWeight:900,fontSize:20,color:s.color}}>{s.val}</div>
                <div style={{fontSize:11,color:'#9397b0',fontWeight:600,marginTop:2}}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{background:'#fff',border:'1px solid #dde3f5',borderRadius:18,padding:'18px 18px 4px',boxShadow:'0 2px 16px rgba(37,99,235,0.08)'}}>
            {meals.map((m,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:i<meals.length-1?'1px solid #dde3f5':'none'}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,borderRadius:12,background:'#eff4ff',border:'1px solid #dde3f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{m.icon}</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:'#1a1d2e'}}>{m.name}</div>
                    <div style={{fontSize:11,color:'#9397b0',marginTop:2}}>{m.date}</div>
                  </div>
                </div>
                <div style={{fontWeight:900,fontSize:16,color:m.big?'#e03151':'#1a1d2e'}}>{'\u20AA'} {m.amount}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div style={{padding:'20px 16px 90px'}}>
          <h2 style={{fontSize:24,fontWeight:800,marginBottom:5,color:'#1a1d2e',margin:'0 0 5px 0'}}>Settings</h2>
          <p style={{fontSize:13,color:'#9397b0',marginBottom:18}}>Set up your food card details</p>

          <div style={cardStyle}>
            <div style={sectionTitleStyle}>Card Type</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {['Cibus','10bis'].map((c,i)=>(
                <div key={i} style={{background:i===0?'#eff4ff':'#f0f4ff',border:`1.5px solid ${i===0?'#2563eb':'#dde3f5'}`,borderRadius:14,padding:14,textAlign:'center',cursor:'pointer'}}>
                  <div style={{fontSize:13,fontWeight:800,color:i===0?'#2563eb':'#1a1d2e'}}>{c}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={sectionTitleStyle}>Working Days</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:6}}>
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=>(
                <div key={i} style={{aspectRatio:'1',borderRadius:10,border:`1.5px solid ${[1,2,3,4].includes(i)?'#2563eb':'#dde3f5'}`,background:[1,2,3,4].includes(i)?'#2563eb':'#f0f4ff',color:[1,2,3,4].includes(i)?'#fff':'#9397b0',fontSize:10,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{d}</div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={sectionTitleStyle}>Budget</div>
            {[{label:'Monthly Budget',val:'900'},{label:'Daily Limit',val:'90'},{label:'Reset Day (1-31)',val:'17'}].map((f,i)=>(
              <div key={i} style={{marginBottom:i<2?14:0}}>
                <label style={labelStyle}>{f.label}</label>
                <input defaultValue={f.val} type="number" style={inputStyle}/>
              </div>
            ))}
          </div>

          <div style={{...cardStyle,marginBottom:20}}>
            <div style={sectionTitleStyle}>Notifications</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <span style={{fontSize:14,color:'#1a1d2e'}}>Enable reminders</span>
              <div style={{width:48,height:26,background:'#2563eb',borderRadius:99,position:'relative',cursor:'pointer'}}>
                <div style={{position:'absolute',width:20,height:20,background:'#fff',borderRadius:'50%',top:3,right:3,boxShadow:'0 1px 4px rgba(0,0,0,0.2)'}}></div>
              </div>
            </div>
            <label style={labelStyle}>Remind me at</label>
            <input type="time" defaultValue="20:00" style={inputStyle}/>
          </div>

          <button style={{width:'100%',padding:15,borderRadius:14,border:'none',background:'#2563eb',color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer'}}>Save Changes</button>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div style={{padding:'20px 16px 90px'}}>
          <h2 style={{fontSize:24,fontWeight:800,marginBottom:5,color:'#1a1d2e',margin:'0 0 5px 0'}}>Notification Preview</h2>
          <p style={{fontSize:13,color:'#9397b0',marginBottom:18}}>What Rami sees on his phone at 20:00</p>
          <div style={{background:'linear-gradient(160deg,#e8f0fe 0%,#ede9fe 50%,#fce7f3 100%)',borderRadius:18,padding:'22px 18px 18px',marginBottom:14,border:'1px solid #dde3f5'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:24}}>
              <div>
                <div style={{fontWeight:900,fontSize:56,lineHeight:1,color:'#1a1d2e'}}>20:00</div>
                <div style={{fontSize:14,fontWeight:600,color:'#4a4f6a',marginTop:4}}>Wednesday, Aug 2</div>
              </div>
              <div style={{fontSize:12,color:'#4a4f6a',textAlign:'right'}}>WiFi<br/>84%</div>
            </div>
            <div style={{background:'rgba(255,255,255,0.88)',borderRadius:16,padding:14,display:'flex',gap:12}}>
              <div style={{width:42,height:42,background:'linear-gradient(135deg,#2563eb,#818cf8)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:13,color:'#fff',flexShrink:0}}>FT</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                  <span style={{fontSize:12,fontWeight:800,color:'#1a1d2e'}}>FoodTrack</span>
                  <span style={{fontSize:11,color:'#9397b0'}}>now</span>
                </div>
                <div style={{fontSize:13,color:'#4a4f6a',lineHeight:1.5}}>
                  Rami, you must spend <strong style={{color:'#e03151'}}>{'\u20AA'} 90</strong> on your Cibus card today or it will be lost!
                  <span style={{display:'block',marginTop:3,color:'#9397b0',fontSize:11}}>Balance: {'\u20AA'} 329 · Resets Aug 17</span>
                </div>
                <div style={{display:'flex',gap:8,marginTop:10}}>
                  <button style={{flex:1,padding:8,borderRadius:8,fontSize:12,fontWeight:700,border:'none',background:'#f0f2f8',cursor:'pointer',color:'#4a4f6a'}}>Dismiss</button>
                  <button style={{flex:1,padding:8,borderRadius:8,fontSize:12,fontWeight:700,border:'none',background:'#2563eb',color:'#fff',cursor:'pointer'}}>Order Now</button>
                </div>
              </div>
            </div>
          </div>
          <div style={{fontSize:12,fontWeight:800,color:'#9397b0',textTransform:'uppercase',letterSpacing:'0.07em',margin:'16px 0 10px'}}>When no action is needed</div>
          <div style={{background:'#edfaf4',border:'1.5px solid #b5ecd5',borderRadius:18,padding:18,display:'flex',alignItems:'center',gap:14}}>
            <div style={{fontSize:28,flexShrink:0,color:'#1daa6e'}}>&#10003;</div>
            <p style={{fontSize:13,color:'#4a4f6a',lineHeight:1.6,margin:0}}>
              <strong style={{color:'#1daa6e'}}>You are all good today!</strong><br/>
              No action needed — you will not lose any money.
            </p>
          </div>
        </div>
      )}

      <nav style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,background:'#fff',borderTop:'1px solid #dde3f5',height:70,display:'flex',alignItems:'center',justifyContent:'space-around',zIndex:100,boxShadow:'0 -4px 20px rgba(37,99,235,0.07)'}}>
        {tabs.map((t)=>(
          <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,padding:'8px 20px',border:'none',background:'transparent',cursor:'pointer',color:activeTab===t.id?'#2563eb':'#9397b0'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={t.path}/>
            </svg>
            <span style={{fontSize:11,fontWeight:700}}>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
