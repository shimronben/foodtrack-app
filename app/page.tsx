'use client';
import { useState, useEffect } from 'react';

interface Settings {
  cardType: string;
  monthlyBudget: number;
  dailyLimit: number;
  resetDay: number;
  workingDays: number[];
  notifyTime: string;
}

interface Meal {
  icon: string;
  name: string;
  date: string;
  amount: number;
}

const DEFAULT_SETTINGS: Settings = {
  cardType: 'Cibus',
  monthlyBudget: 0,
  dailyLimit: 0,
  resetDay: 1,
  workingDays: [1,2,3,4,5],
  notifyTime: '20:00',
};

const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function calcDashboard(settings: Settings, remainingBalance: number) {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Find reset date this cycle
  let resetDate = new Date(currentYear, currentMonth, settings.resetDay);
  if (currentDay >= settings.resetDay) {
    resetDate = new Date(currentYear, currentMonth + 1, settings.resetDay);
  }

  // Count working days from tomorrow up to (but not including) reset date
  let workingDaysLeft = 0;
  const cursor = new Date(today);
  cursor.setDate(cursor.getDate()); // include today
  while (cursor < resetDate) {
    if (settings.workingDays.includes(cursor.getDay())) {
      workingDaysLeft++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  // How much per day needed to use all balance
  const neededPerDay = workingDaysLeft > 0 ? remainingBalance / workingDaysLeft : remainingBalance;

  // Balance to use today
  const balanceToUseToday = neededPerDay >= settings.dailyLimit ? settings.dailyLimit : 0;
  const mustSpendToday = neededPerDay >= settings.dailyLimit;

  // Progress
  const spent = settings.monthlyBudget - remainingBalance;
  const pct = settings.monthlyBudget > 0 ? Math.round((spent / settings.monthlyBudget) * 100) : 0;

  // Format reset date
  const resetLabel = resetDate.toLocaleDateString('en-GB',{day:'numeric',month:'short'});

  return { workingDaysLeft, balanceToUseToday, mustSpendToday, spent, pct, resetLabel, neededPerDay };
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [tempSettings, setTempSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [tempBalance, setTempBalance] = useState('0');
  const [userName, setUserName] = useState('User');
  const [meals] = useState<Meal[]>([
    {icon:'🍕',name:'Pizza Hut',date:'Aug 1, Wednesday',amount:45},
    {icon:'🍣',name:'Sushi Bar',date:'Aug 2, Thursday',amount:88},
    {icon:'🥗',name:'Green Bowl',date:'Jul 31, Tuesday',amount:32},
    {icon:'🍔',name:'Burger Brothers',date:'Jul 30, Monday',amount:55},
    {icon:'🌮',name:'Taco House',date:'Jul 29, Sunday',amount:41},
    {icon:'🍜',name:'Noodle Bar',date:'Jul 28, Thursday',amount:38},
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('ft_settings');
    const savedBalance = localStorage.getItem('ft_balance');
    const savedName = localStorage.getItem('ft_name');
    if (saved) { setSettings(JSON.parse(saved)); setTempSettings(JSON.parse(saved)); }
    if (savedBalance) { setRemainingBalance(parseFloat(savedBalance)); setTempBalance(savedBalance); }
    if (savedName) setUserName(savedName);
  }, []);

  const saveSettings = () => {
    localStorage.setItem('ft_settings', JSON.stringify(tempSettings));
    localStorage.setItem('ft_balance', tempBalance);
    setSettings(tempSettings);
    setRemainingBalance(parseFloat(tempBalance) || 0);
    setActiveTab('dashboard');
  };

  const toggleWorkingDay = (day: number) => {
    const days = tempSettings.workingDays.includes(day)
      ? tempSettings.workingDays.filter(d => d !== day)
      : [...tempSettings.workingDays, day];
    setTempSettings({...tempSettings, workingDays: days});
  };

  const dash = calcDashboard(settings, remainingBalance);

  const tabs = [
    {id:'dashboard',label:'Dashboard',path:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'},
    {id:'settings',label:'Settings',path:'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'},
    {id:'alerts',label:'Alerts',path:'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0'},
  ];

  const S = '\u20AA';
  const cardStyle = {background:'#fff',border:'1px solid #dde3f5',borderRadius:18,padding:18,marginBottom:14,boxShadow:'0 2px 16px rgba(37,99,235,0.08)'};
  const inputStyle = {width:'100%',background:'#f0f4ff',border:'1.5px solid #dde3f5',borderRadius:12,fontSize:15,padding:'13px 14px',outline:'none',color:'#1a1d2e',fontFamily:'sans-serif',boxSizing:'border-box'} as React.CSSProperties;
  const labelStyle = {display:'block',fontSize:11,fontWeight:700,color:'#4a4f6a',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.06em'} as React.CSSProperties;
  const secTitle = {fontSize:16,fontWeight:700,marginBottom:14,color:'#1a1d2e'};

  if (!loggedIn) {
    return (
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:'linear-gradient(160deg,#1e3a8a 0%,#2563eb 50%,#6d28d9 100%)'}}>
        <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 32px 32px'}}>
          <div style={{width:84,height:84,background:'rgba(255,255,255,0.15)',border:'2px solid rgba(255,255,255,0.3)',borderRadius:26,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:900,color:'#fff',marginBottom:22}}>FT</div>
          <h1 style={{fontSize:40,fontWeight:900,color:'#fff',margin:'0 0 10px 0'}}>FoodTrack</h1>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.7)',textAlign:'center',lineHeight:1.65,maxWidth:240,margin:0}}>Manage your meal card budget and never leave money on the table</p>
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
          <h2 style={{fontSize:22,fontWeight:800,margin:'0 0 5px 0',color:'#1a1d2e'}}>Welcome back</h2>
          <p style={{fontSize:13,color:'#9397b0',marginBottom:22}}>Sign in to your account</p>
          <div style={{marginBottom:14}}>
            <label style={labelStyle}>Your name</label>
            <input type="text" placeholder="e.g. Rami" value={userName} onChange={e=>setUserName(e.target.value)} style={inputStyle}/>
          </div>
          <div style={{marginBottom:14}}>
            <label style={labelStyle}>Email address</label>
            <input type="email" placeholder="you@company.com" style={inputStyle}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={labelStyle}>Password</label>
            <input type="password" placeholder="••••••••" style={inputStyle}/>
          </div>
          <button onClick={()=>{ localStorage.setItem('ft_name', userName); setLoggedIn(true); setActiveTab('settings'); }} style={{width:'100%',padding:15,borderRadius:14,border:'none',background:'#2563eb',color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer'}}>
            Sign In — Set up my card
          </button>
          <p style={{textAlign:'center',fontSize:13,color:'#9397b0',marginTop:16}}>Already set up? <span onClick={()=>{ localStorage.setItem('ft_name',userName); setLoggedIn(true); }} style={{color:'#2563eb',fontWeight:700,cursor:'pointer'}}>Go to Dashboard</span></p>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:'#f0f4ff',minHeight:'100vh',maxWidth:430,margin:'0 auto',fontFamily:'sans-serif',color:'#1a1d2e'}}>

      {activeTab === 'dashboard' && (
        <div style={{padding:'20px 16px 90px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
            <div>
              <div style={{fontSize:12,color:'#9397b0',fontWeight:600,marginBottom:3}}>Good evening</div>
              <h2 style={{fontSize:22,fontWeight:800,color:'#1a1d2e',margin:0}}>Hey, {userName}</h2>
            </div>
            <div style={{width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,#2563eb,#818cf8)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:16,color:'#fff'}}>{userName.charAt(0).toUpperCase()}</div>
          </div>

          {settings.monthlyBudget === 0 ? (
            <div style={{...cardStyle,textAlign:'center',padding:32}}>
              <div style={{fontSize:36,marginBottom:12}}>👋</div>
              <div style={{fontSize:16,fontWeight:800,color:'#1a1d2e',marginBottom:8}}>Welcome! Let&apos;s get started</div>
              <div style={{fontSize:13,color:'#9397b0',marginBottom:20}}>Go to Settings to enter your card details and see your live budget status.</div>
              <button onClick={()=>setActiveTab('settings')} style={{padding:'12px 28px',borderRadius:12,border:'none',background:'#2563eb',color:'#fff',fontSize:14,fontWeight:700,cursor:'pointer'}}>Set up my card</button>
            </div>
          ) : (
            <>
              <div style={{borderRadius:22,padding:3,marginBottom:14,background: dash.mustSpendToday ? 'linear-gradient(135deg,#2563eb,#7c3aed,#db2777,#f59e0b,#10b981)' : 'linear-gradient(135deg,#1daa6e,#0891b2)'}}>
                <div style={{background:'#fff',borderRadius:20,padding:'24px 16px',textAlign:'center'}}>
                  {dash.mustSpendToday ? (
                    <>
                      <div style={{display:'inline-block',background:'#fef0f3',border:'1px solid #f5c2cc',borderRadius:99,padding:'4px 14px',fontSize:11,fontWeight:800,color:'#e03151',textTransform:'uppercase',letterSpacing:'0.09em',marginBottom:14}}>Action required today</div>
                      <div style={{fontWeight:900,fontSize:64,color:'#e03151',lineHeight:1,marginBottom:10}}>{S} {dash.balanceToUseToday}</div>
                      <div style={{fontSize:14,color:'#4a4f6a',lineHeight:1.6}}>You must spend this on your <strong style={{color:'#1a1d2e'}}>{settings.cardType}</strong> card today or the budget will be lost!</div>
                    </>
                  ) : (
                    <>
                      <div style={{display:'inline-block',background:'#edfaf4',border:'1px solid #b5ecd5',borderRadius:99,padding:'4px 14px',fontSize:11,fontWeight:800,color:'#1daa6e',textTransform:'uppercase',letterSpacing:'0.09em',marginBottom:14}}>All good today</div>
                      <div style={{fontWeight:900,fontSize:64,color:'#1daa6e',lineHeight:1,marginBottom:10}}>{S} 0</div>
                      <div style={{fontSize:14,color:'#4a4f6a',lineHeight:1.6}}>No action needed — you will <strong style={{color:'#1a1d2e'}}>not lose money</strong> if no action is taken today.</div>
                    </>
                  )}
                </div>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
                {[
                  {label:'Remaining balance',val:`${S} ${remainingBalance}`,sub:`of ${S} ${settings.monthlyBudget} total`,color:'#2563eb'},
                  {label:'Resets on',val:dash.resetLabel,sub:`${dash.workingDaysLeft} working days left`,color:'#1a1d2e'},
                  {label:'Spend today',val:`${S} ${dash.balanceToUseToday}`,sub: dash.mustSpendToday ? 'or it will be gone' : 'no action needed',color: dash.mustSpendToday ? '#e03151' : '#1daa6e'},
                  {label:'Daily limit',val:`${S} ${settings.dailyLimit}`,sub:'max allowed',color:'#1a1d2e'},
                ].map((s,i)=>(
                  <div key={i} style={{background:'#fff',border:'1px solid #dde3f5',borderRadius:16,padding:16,boxShadow:'0 2px 16px rgba(37,99,235,0.08)'}}>
                    <div style={{fontSize:11,fontWeight:700,color:'#9397b0',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:8}}>{s.label}</div>
                    <div style={{fontWeight:900,fontSize:22,color:s.color,lineHeight:1}}>{s.val}</div>
                    <div style={{fontSize:11,color:'#9397b0',marginTop:4}}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <div style={cardStyle}>
                <div style={{fontSize:14,fontWeight:700,marginBottom:10,color:'#1a1d2e'}}>Monthly usage</div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#9397b0',fontWeight:600,marginBottom:8}}>
                  <span>{S} {dash.spent} spent</span><span>{dash.pct}%</span>
                </div>
                <div style={{height:10,background:'#f0f4ff',borderRadius:99,overflow:'hidden',border:'1px solid #dde3f5'}}>
                  <div style={{width:`${dash.pct}%`,height:'100%',borderRadius:99,background:'linear-gradient(90deg,#2563eb,#818cf8)',transition:'width 0.5s ease'}}></div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,fontWeight:600,marginTop:6}}>
                  <span style={{color:'#1daa6e'}}>{S} {remainingBalance} remaining</span>
                  <span style={{color:'#9397b0'}}>{S} {settings.monthlyBudget} budget</span>
                </div>
              </div>
            </>
          )}

          <div style={{fontSize:16,fontWeight:800,marginBottom:12,color:'#1a1d2e'}}>Recent meals</div>
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
                <div style={{fontWeight:900,fontSize:16,color:m.amount>=settings.dailyLimit*0.9?'#e03151':'#1a1d2e'}}>{S} {m.amount}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div style={{padding:'20px 16px 90px'}}>
          <h2 style={{fontSize:24,fontWeight:800,margin:'0 0 5px 0',color:'#1a1d2e'}}>Settings</h2>
          <p style={{fontSize:13,color:'#9397b0',marginBottom:18}}>Enter your real card details here</p>

          <div style={cardStyle}>
            <div style={secTitle}>Remaining Balance</div>
            <p style={{fontSize:13,color:'#9397b0',marginBottom:10}}>Check your {tempSettings.cardType} app and enter your current balance</p>
            <label style={labelStyle}>Current balance ({S})</label>
            <input type="number" inputMode="decimal" value={tempBalance} onChange={e=>setTempBalance(e.target.value)} style={inputStyle} placeholder="e.g. 329"/>
          </div>

          <div style={cardStyle}>
            <div style={secTitle}>Card Type</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {['Cibus','10bis'].map((c)=>(
                <div key={c} onClick={()=>setTempSettings({...tempSettings,cardType:c})} style={{background:tempSettings.cardType===c?'#eff4ff':'#f0f4ff',border:`1.5px solid ${tempSettings.cardType===c?'#2563eb':'#dde3f5'}`,borderRadius:14,padding:14,textAlign:'center',cursor:'pointer'}}>
                  <div style={{fontSize:13,fontWeight:800,color:tempSettings.cardType===c?'#2563eb':'#1a1d2e'}}>{c}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={secTitle}>Working Days</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:6}}>
              {DAY_NAMES.map((d,i)=>(
                <div key={i} onClick={()=>toggleWorkingDay(i)} style={{aspectRatio:'1',borderRadius:10,border:`1.5px solid ${tempSettings.workingDays.includes(i)?'#2563eb':'#dde3f5'}`,background:tempSettings.workingDays.includes(i)?'#2563eb':'#f0f4ff',color:tempSettings.workingDays.includes(i)?'#fff':'#9397b0',fontSize:10,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{d}</div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={secTitle}>Budget</div>
            <div style={{marginBottom:14}}>
              <label style={labelStyle}>Monthly Budget ({S})</label>
              <input type="number" inputMode="numeric" value={tempSettings.monthlyBudget||''} onChange={e=>setTempSettings({...tempSettings,monthlyBudget:parseFloat(e.target.value)||0})} style={inputStyle} placeholder="e.g. 900"/>
            </div>
            <div style={{marginBottom:14}}>
              <label style={labelStyle}>Daily Limit ({S})</label>
              <input type="number" inputMode="numeric" value={tempSettings.dailyLimit||''} onChange={e=>setTempSettings({...tempSettings,dailyLimit:parseFloat(e.target.value)||0})} style={inputStyle} placeholder="e.g. 90"/>
            </div>
            <div>
              <label style={labelStyle}>Reset Day (1–31)</label>
              <input type="number" inputMode="numeric" value={tempSettings.resetDay||''} onChange={e=>setTempSettings({...tempSettings,resetDay:parseInt(e.target.value)||1})} style={inputStyle} placeholder="e.g. 17"/>
            </div>
          </div>

          <div style={{...cardStyle,marginBottom:20}}>
            <div style={secTitle}>Notifications</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <span style={{fontSize:14,color:'#1a1d2e'}}>Enable reminders</span>
              <div style={{width:48,height:26,background:'#2563eb',borderRadius:99,position:'relative',cursor:'pointer'}}>
                <div style={{position:'absolute',width:20,height:20,background:'#fff',borderRadius:'50%',top:3,right:3,boxShadow:'0 1px 4px rgba(0,0,0,0.2)'}}></div>
              </div>
            </div>
            <label style={labelStyle}>Remind me at</label>
            <input type="time" value={tempSettings.notifyTime} onChange={e=>setTempSettings({...tempSettings,notifyTime:e.target.value})} style={inputStyle}/>
          </div>

          <button onClick={saveSettings} style={{width:'100%',padding:15,borderRadius:14,border:'none',background:'#2563eb',color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer'}}>Save & See My Dashboard</button>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div style={{padding:'20px 16px 90px'}}>
          <h2 style={{fontSize:24,fontWeight:800,margin:'0 0 5px 0',color:'#1a1d2e'}}>Notification Preview</h2>
          <p style={{fontSize:13,color:'#9397b0',marginBottom:18}}>What you will see on your phone at {settings.notifyTime}</p>
          <div style={{background:'linear-gradient(160deg,#e8f0fe 0%,#ede9fe 50%,#fce7f3 100%)',borderRadius:18,padding:'22px 18px 18px',marginBottom:14,border:'1px solid #dde3f5'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:24}}>
              <div>
                <div style={{fontWeight:900,fontSize:56,lineHeight:1,color:'#1a1d2e'}}>{settings.notifyTime}</div>
                <div style={{fontSize:14,fontWeight:600,color:'#4a4f6a',marginTop:4}}>Today</div>
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
                {dash.mustSpendToday ? (
                  <div style={{fontSize:13,color:'#4a4f6a',lineHeight:1.5}}>
                    {userName}, you must spend <strong style={{color:'#e03151'}}>{S} {dash.balanceToUseToday}</strong> on your {settings.cardType} card today or it will be lost!
                    <span style={{display:'block',marginTop:3,color:'#9397b0',fontSize:11}}>Balance: {S} {remainingBalance} · Resets {dash.resetLabel}</span>
                  </div>
                ) : (
                  <div style={{fontSize:13,color:'#4a4f6a',lineHeight:1.5}}>
                    {userName}, <strong style={{color:'#1daa6e'}}>you are all good today!</strong> No action needed.
                    <span style={{display:'block',marginTop:3,color:'#9397b0',fontSize:11}}>Balance: {S} {remainingBalance} · Resets {dash.resetLabel}</span>
                  </div>
                )}
                <div style={{display:'flex',gap:8,marginTop:10}}>
                  <button style={{flex:1,padding:8,borderRadius:8,fontSize:12,fontWeight:700,border:'none',background:'#f0f2f8',cursor:'pointer',color:'#4a4f6a'}}>Dismiss</button>
                  <button style={{flex:1,padding:8,borderRadius:8,fontSize:12,fontWeight:700,border:'none',background:'#2563eb',color:'#fff',cursor:'pointer'}}>Order Now</button>
                </div>
              </div>
            </div>
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
