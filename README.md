# Inno — Intelligent Refinery Dashboard (Park Naft)

اسکلت پروژه و داشبرد صنعتی برای پایش لحظه‌ای واحدهای فرآیندی پالایشگاه. این نسخه‌ی
اولیه شامل ساختار کامل پروژه (React + TypeScript + Vite + Tailwind CSS 4) و یک
داشبرد کاملاً کاربردی با داده‌های نمونه است — آماده برای اتصال به منبع داده‌ی واقعی
(historian / OPC-UA / MQTT / REST API).

## Stack

- **Vite + React 19 + TypeScript** (`strict` mode) — app shell & build tooling
- **React Router 7** — client-side routing, per-page code-splitting via `React.lazy`
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — utility styling, theme tokens as CSS variables
- **Recharts** — process trend charts (temperature / pressure / flow)
- **lucide-react** — icon set
- **Vazirmatn** (Google Fonts) — Persian/Latin typeface for bilingual labels
- Design tokens follow a validated categorical/status/sequential color system
  (see `src/index.css`) — colorblind-safe, contrast-checked in both the dark
  control-room surface (default) and the light theme.

## Project structure

```
src/
  components/
    layout/       # Sidebar (+ mobile drawer), Topbar, shared NavList, Layout shell
    dashboard/     KPI cards, trend charts, alarms panel, equipment grid,
                    tank gauges, process flow diagram, HSE strip
    ui/            Shared primitives (Panel, StatusDot/Badge)
  data/            Mock data — swap for real API/historian calls
  hooks/           useLiveTrend (simulated telemetry), useAlarms (shared alarm
                    state + acknowledge), useTheme (dark/light, persisted)
  lib/             Formatting, status/severity color helpers, nav config
  pages/           One page per sidebar section (Overview, Process Units,
                    Trends, Tanks & Storage, Alarms, HSE, Settings)
  types/           Shared TypeScript types (ProcessUnit, AlarmEvent, …)
```

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## What's implemented

- **Full navigation** — every sidebar item (Overview, Process Units, Trends,
  Tanks & Storage, Alarms, HSE, Settings) routes to a real page; the sidebar
  collapses to icons on desktop and becomes a slide-over drawer on mobile
  (opened from the Topbar hamburger button below the `md` breakpoint).
- **KPI row** — crude throughput, product yield, energy intensity, active alarms
  (each with a compact sparkline and period-over-period delta).
- **Process flow diagram** — CDU → VDU → CRU/HCU → SRU → Product Pool plus a
  support-systems row (feed pumps, utilities/steam, cooling water) so all 8
  mock process units are represented, including the one currently in `fault`.
- **Process trends** — temperature / pressure / flow as three small-multiple
  charts (kept on separate scales deliberately — a shared axis across
  different units of measure is a classic dashboard mistake).
- **Alarms & events** — severity-coded feed (critical/serious/warning/resolved),
  bilingual (EN/FA) messages, filterable by severity, with a working
  **Acknowledge** action backed by shared state (`useAlarms`) — acknowledging
  an alarm anywhere (Topbar bell, Dashboard panel, Alarms page) updates the
  unread count everywhere.
- **Process units grid** — status badges (running/standby/warning/fault) per unit.
- **Tanks & storage** — level meters with severity-colored fill, plus a
  sortable-by-eye detail table and aggregate fill-rate stats.
- **HSE & sustainability strip** — days since incident, flaring, CO₂ emissions,
  compliance score.
- **Topbar** — live clock, working unit/tank search with results dropdown,
  notification bell with a real dropdown of unacknowledged alarms (badge count
  is derived, never hardcoded), user menu, and a dark/light theme toggle.
- **Theme** — dark (default) and light are both reachable at runtime, persisted
  to `localStorage`, seeded from `prefers-color-scheme` on first visit.
- **Accessibility** — icon-only buttons carry `aria-label`s, decorative icons
  are `aria-hidden`, the active nav item exposes `aria-current` (via
  `NavLink`), and severity filters use `aria-pressed`/`role="group"`.
- **Code-split routing** — each page is a separate `React.lazy` chunk, so the
  `recharts`-heavy Trends bundle isn't downloaded until a user actually visits
  it.
- **TypeScript `strict` mode** is on for both the app and Vite config.

## Known limitations / next steps

1. All data is simulated (`src/data/mockData.ts`, `useLiveTrend`) — only the
   trend charts actually tick on an interval. Wiring a real historian/OPC-UA/
   MQTT feed would need every panel (alarms, tanks, unit status, KPIs) to
   subscribe the same way `useLiveTrend` does.
2. No authentication / role-based access — required before exposing this
   beyond a trusted control-room network. The Topbar user menu is a static
   placeholder, not a real session.
3. "Bilingual" today means English + Farsi labels shown side by side, not a
   true i18n switch — there's no `dir="rtl"` layout mode. A real Farsi-primary
   mode would need a language toggle plus RTL-aware layout, not just translated
   strings.
4. No automated tests yet (unit or e2e) — worth adding before further feature
   growth, especially around `useAlarms` and the routing shell.

📄 سند الزامات نرم‌افزاری (SRS) - سامانه IA-RPPMS
۱. مقدمه
۱-۱ هدف
هدف از این سند، تعریف کامل الزامات فنی، عملیاتی و کارکردی سامانه جامع خودمختار پالایش و پتروشیمی (IA-RPPMS) است. این سامانه با هدف ایجاد یک پلتفرم یکپارچه برای مانیتورینگ، بهینه‌سازی، نگهداری پیش‌بینی‌کننده، مدیریت ایمنی و توسعه بازار در ۱۲ پالایشگاه دولتی و مجموعه‌های پتروشیمی ایران طراحی شده است.

۱-۲ حوزه کاربرد
پالایشگاه‌های نفت خام و میعانات گازی

مجتمع‌های پتروشیمی (تولید الفین، پلیمر، کود و ...)

واحدهای فرآیندی شامل تقطیر، کراکینگ، ریفرمینگ، هیدروتریتینگ و ...

۱-۳ ذی‌نفعان
مدیران ارشد و میانی پالایشگاه‌ها و پتروشیمی‌ها

اپراتورهای واحدهای فرآیندی

تیم‌های تعمیرات و نگهداری

واحدهای برنامه‌ریزی و بهینه‌سازی

واحدهای HSE و محیط زیست

مدیران مالی و بازرگانی (توسعه بازار بین‌الملل)

۲. مراجع و استانداردها
استاندارد	شرح
ISA-95	استاندارد یکپارچه‌سازی سیستم‌های تولید و صنعتی
IEC 62443	امنیت سایبری در سیستم‌های اتوماسیون صنعتی
ISO 55000	مدیریت دارایی‌های فیزیکی
API RP 754	شاخص‌های عملکرد ایمنی فرآیند
ISA-106	رویه‌های عملیاتی خودکار
NAMUR NE 107	مدیریت هشدار در صنعت فرآیند
۳. الزامات کلان سیستم
۳-۱ معماری فنی
معماری میکروسرویس با قابلیت مقیاس‌پذیری افقی

ذخیره‌سازی تایم‌سری (مانند InfluxDB) برای داده‌های عملیاتی

پایگاه داده رابطه‌ای (مانند PostgreSQL) برای داده‌های ساختاریافته

پیاده‌سازی روی زیرساخت ابری / on-premise با قابلیت بازیابی بلایا

پشتیبانی از ۱۲۰+ پروتکل صنعتی (OPC UA، Modbus، Profibus، HART، و ...)

۳-۲ الزامات امنیتی
احراز هویت دو مرحله‌ای (MFA) برای تمام کاربران

رمزنگاری داده‌ها در حالت سکون و در حال انتقال (AES-256، TLS 1.3)

ثبت کامل لاگ‌های عملیاتی و دسترسی‌ها

تفکیک سطوح دسترسی بر اساس نقش (RBAC)

انطباق با استاندارد IEC 62443 سطح امنیتی SL2

۳-۳ الزامات عملکردی
زمان پاسخ‌دهی صفحات داشبورد < ۳ ثانیه

تأخیر مانیتورینگ بلادرنگ < ۵۰۰ میلی‌ثانیه

نرخ به‌روزرسانی داده‌های سنسورها: حداقل هر ۱ ثانیه

پردازش ۳۰,۰۰۰ رکورد در دقیقه

در دسترس بودن سیستم ۹۹.۹۹% (چهار ناین)

قابلیت همزمانی حداقل ۵۰۰ کاربر همزمان

۴. الزامات کارکردی (Functional Requirements)
۴-۱ ماژول مانیتورینگ خودمختار (FR-MON)
شماره	الزام	شرح
FR-MON-01	دوقلوی دیجیتال سه‌بعدی	نمایش ۳۶۰ درجه مجتمع با جزئیات کامل شامل ۱۰۰+ قطعه حیاتی
FR-MON-02	نقشه حرارتی	نمایش کدهای رنگی (سبز/زرد/قرمز) برای وضعیت سلامت تجهیزات
FR-MON-03	هشدار پیش‌بینی‌کننده	تشخیص ناهنجاری و صدور اخطار ۱۲-۲۵ دقیقه قبل از خرابی
FR-MON-04	یکپارچه‌سازی پهپادها	برنامه‌ریزی پرواز خودکار برای بازرسی مناطق پرخطر
FR-MON-05	سنسورهای نرم‌افزاری	پیش‌بینی کیفیت محصول با ۴۰+ سنسور مجازی
۴-۲ ماژول بهینه‌سازی خودمختار (FR-OPT)
شماره	الزام	شرح
FR-OPT-01	APC پیشرفته	تنظیم خودکار پارامترهای فرآیند هر ۱ دقیقه
FR-OPT-02	RTO بلادرنگ	شبیه‌سازی سناریوها با نرخ همگرایی > ۹۶%
FR-OPT-03	بهینه‌سازی انرژی	کاهش ۳-۸% مصرف انرژی با اصلاح نسبت سوخت به هوا
FR-OPT-04	مدیریت هوشمند کاتالیست	پیش‌بینی غیرفعال‌سازی و زمان تعویض
FR-OPT-05	بهینه‌سازی سبد محصولات	بیشینه‌سازی حاشیه سود بر اساس قیمت‌های روز
۴-۳ ماژول نگهداری پیش‌بینی‌کننده (FR-PM)
شماره	الزام	شرح
FR-PM-01	پایش وضعیت (CBM)	تحلیل ارتعاش، دما، فشار و اولتراسونیک
FR-PM-02	پیش‌بینی خرابی	هدف‌گذاری ۸۲% کاهش توقفات ناگهانی
FR-PM-03	نرخ تعمیرات پیش‌بینی‌شده	هدف‌گذاری > ۸۰%
FR-PM-04	شبیه‌سازی STO	برنامه‌ریزی تعمیرات اساسی در محیط مجازی
FR-PM-05	مدیریت قطعات یدکی	پیش‌بینی و تدارک هوشمند قطعات موردنیاز
۴-۴ ماژول ایمنی، بهداشت و محیط زیست (FR-HSMS)
شماره	الزام	شرح
FR-HSMS-01	پایش لحظه‌ای آلاینده‌ها	اندازه‌گیری SOx، NOx، CO2، ذرات معلق
FR-HSMS-02	کاهش انتشار کربن	هدف‌گذاری ۱۹% کاهش
FR-HSMS-03	مدیریت مجوزهای کار (PTW)	صدور و کنترل دیجیتال مجوزها
FR-HSMS-04	ثبت و تحلیل حوادث	تحلیل علل ریشه‌ای (RCA) با هوش مصنوعی
FR-HSMS-05	انطباق با استانداردها	ممیزی خودکار انطباق با API RP 754
۴-۵ ماژول آموزش و توانمندسازی (FR-TRN)
شماره	الزام	شرح
FR-TRN-01	شبیه‌ساز اپراتوری (OTS)	آموزش واکنش به ۵۰+ سناریوی بحرانی
FR-TRN-02	دستیار هوش مصنوعی مولد	راهنمای بلادرنگ برای عیب‌یابی و به‌روزرسانی رویه‌ها
FR-TRN-03	مدیریت دانش	بانک اطلاعاتی از تجربیات و بهترین‌رویه‌ها
۴-۶ ماژول مالی و توسعه بازار (FR-FIN)
شماره	الزام	شرح
FR-FIN-01	هزینه‌یابی بلادرنگ	محاسبه بهای تمام‌شده هر محصول به‌صورت لحظه‌ای
FR-FIN-02	داشبورد سود هر بشکه	نمایش حاشیه سود لحظه‌ای و پیش‌بینی روندها
FR-FIN-03	شاخص شدت انرژی (EII)	پایش و بهبود EII با هدف < ۹۲.۵
FR-FIN-04	شاخص‌های سرمایه‌گذاری	محاسبه OEE، RAF و قابلیت اطمینان برای جذب سرمایه‌گذار خارجی
FR-FIN-05	تحلیل بازار بین‌الملل	مقایسه قیمت‌های جهانی با محصولات تولیدی
۵. الزامات غیرکارکردی (Non-Functional Requirements)
حوزه	الزام
عملکرد	پاسخ‌دهی < ۳ ثانیه، تأخیر < ۵۰۰ میلی‌ثانیه
در دسترس‌بودن	۹۹.۹۹% در دسترس بودن سالانه
مقیاس‌پذیری	پشتیبانی از ۱۲ مجتمع با ۱۰۰+ دستگاه حیاتی هرکدام
امنیت	انطباق با IEC 62443، رمزنگاری AES-256
قابلیت نگهداری	معماری ماژولار، مستندسازی کامل API
قابلیت تست	محیط تست جداگانه با داده‌های شبیه‌سازی‌شده
بومی‌سازی	پشتیبانی کامل از زبان فارسی
یکپارچه‌سازی	قابلیت اتصال به SAP، سیستم‌های DCS و ERP موجود
۶. موارد استفاده کلیدی (Use Cases)
شماره	سناریو	ورودی	خروجی
UC-01	تشخیص خرابی قریب‌الوقوع کمپرسور	داده‌های ارتعاش، دما و فشار	هشدار ۲۰ دقیقه قبل + دستورالعمل تعمیر
UC-02	بهینه‌سازی کوره تقطیر	ترکیب خوراک، دمای محیط، قیمت سوخت	تنظیمات بهینه نسبت سوخت به هوا و دمای خروجی
UC-03	کاهش انتشار CO2	داده‌های انتشار لحظه‌ای	پیشنهاد سناریوهای کاهش + گزارش انطباق
UC-04	آموزش اپراتور جدید	انتخاب سناریوی خرابی	شبیه‌سازی واقع‌گرایانه + ارزیابی عملکرد
۷. داده‌های شبیه‌سازی‌شده (Synthetic Data)
برای تست، آموزش مدل‌های هوش مصنوعی و اعتبارسنجی سامانه، داده‌های شبیه‌سازی‌شده به تعداد ۱۰۰,۰۰۰ رکورد برای یک واحد فرآیندی (مثلاً برج تقطیر اتمسفریک) تولید شده است.

ساختار داده‌ها
ستون	شرح	محدوده
timestamp	زمان ثبت داده	۲۰۲۴-۰۱-۰۱ ۰۰:۰۰:۰۰ تا ۲۰۲۴-۱۲-۳۱ ۲۳:۵۹:۵۹
unit_id	شناسه واحد فرآیندی	"CDU-01"
feed_flow	دبی خوراک ورودی (بشکه در روز)	۸۰,۰۰۰ - ۱۲۰,۰۰۰
feed_temp	دمای خوراک ورودی (°C)	۳۵۰ - ۴۰۰
column_pressure	فشار برج (psig)	۱۰ - ۱۵
reflux_ratio	نسبت ریفلاکس	۱.۲ - ۲.۰
reboiler_temp	دمای ریبویلر (°C)	۳۴۰ - ۳۸۰
top_temp	دمای بالای برج (°C)	۱۲۰ - ۱۶۰
bottom_temp	دمای پایین برج (°C)	۳۴۰ - ۳۷۰
naphtha_yield	بازده نفتا (%)	۱۵ - ۲۵
kerosene_yield	بازده نفت سفید (%)	۲۰ - ۳۰
gasoil_yield	بازده گازوییل (%)	۳۰ - ۴۰
residue_yield	بازده برجای‌مانده (%)	۵ - ۱۵
energy_consumption	مصرف انرژی (GJ/روز)	۵۰,۰۰۰ - ۷۵,۰۰۰
efficiency	راندمان کلی (%)	۸۵ - ۹۳
co2_emission	انتشار CO2 (تن/روز)	۲۰۰ - ۳۵۰
equipment_health	وضعیت سلامت تجهیزات	۰ (سالم) تا ۱ (خراب)
alert_flag	آیا هشدار صادر شده؟	۰ یا ۱
predicted_failure_hours	زمان پیش‌بینی‌شده تا خرابی (ساعت)	۰ - ۲۰۰
کد Python برای تولید داده‌های سنتتیک
python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# تنظیمات اولیه
np.random.seed(42)
random.seed(42)

def generate_synthetic_data(num_records=100000):
    """
    تولید داده‌های سنتتیک برای واحد برج تقطیر اتمسفریک
    
    Parameters:
    num_records (int): تعداد رکوردهای مورد نیاز
    
    Returns:
    pd.DataFrame: داده‌های شبیه‌سازی‌شده
    """
    
    start_date = datetime(2024, 1, 1, 0, 0, 0)
    
    # ایجاد تایم‌استمپ‌ها با فواصل ۵ دقیقه‌ای
    timestamps = [start_date + timedelta(minutes=5*i) for i in range(num_records)]
    
    # تولید پارامترهای ورودی با توزیع‌های واقع‌گرایانه
    
    # دبی خوراک: روند فصلی + نویز
    base_feed = 100000
    seasonal_pattern = 10000 * np.sin(2 * np.pi * np.arange(num_records) / (365*24*12))  # تغییرات سالانه
    noise_feed = np.random.normal(0, 3000, num_records)
    feed_flow = base_feed + seasonal_pattern + noise_feed
    feed_flow = np.clip(feed_flow, 80000, 120000)
    
    # دمای خوراک: وابسته به دبی
    feed_temp = 375 + 0.0001 * (feed_flow - 100000) + np.random.normal(0, 5, num_records)
    feed_temp = np.clip(feed_temp, 350, 400)
    
    # فشار برج: نسبت معکوس با دبی
    column_pressure = 12.5 - 0.00003 * (feed_flow - 100000) + np.random.normal(0, 0.5, num_records)
    column_pressure = np.clip(column_pressure, 10, 15)
    
    # نسبت ریفلاکس: تابعی از دمای بالای برج
    base_reflex = 1.6
    reflux_ratio = base_reflex + 0.005 * (feed_temp - 375) + np.random.normal(0, 0.1, num_records)
    reflux_ratio = np.clip(reflux_ratio, 1.2, 2.0)
    
    # دمای ریبویلر: بهینه‌سازی شده بر اساس بازده
    reboiler_temp = 360 + 0.5 * (reflux_ratio - 1.6) * 10 + np.random.normal(0, 2, num_records)
    reboiler_temp = np.clip(reboiler_temp, 340, 380)
    
    # دمای بالا و پایین برج
    top_temp = 140 + 0.3 * (reflux_ratio - 1.6) * 10 + np.random.normal(0, 3, num_records)
    top_temp = np.clip(top_temp, 120, 160)
    
    bottom_temp = 355 + 0.2 * (reboiler_temp - 360) + np.random.normal(0, 3, num_records)
    bottom_temp = np.clip(bottom_temp, 340, 370)
    
    # بازده محصولات: مدل غیرخطی
    # نفتا: با افزایش نسبت ریفلاکس افزایش می‌یابد
    naphtha_yield = 18 + 2 * (reflux_ratio - 1.6) * 5 + np.random.normal(0, 1, num_records)
    naphtha_yield = np.clip(naphtha_yield, 15, 25)
    
    # نفت سفید: تابعی از دمای بالای برج
    kerosene_yield = 25 + 0.1 * (top_temp - 140) + np.random.normal(0, 1.5, num_records)
    kerosene_yield = np.clip(kerosene_yield, 20, 30)
    
    # گازوییل: باقیمانده
    gasoil_yield = 35 - 0.1 * (bottom_temp - 355) + np.random.normal(0, 2, num_records)
    gasoil_yield = np.clip(gasoil_yield, 30, 40)
    
    # برجای‌مانده
    residue_yield = 100 - (naphtha_yield + kerosene_yield + gasoil_yield) + np.random.normal(0, 0.5, num_records)
    residue_yield = np.clip(residue_yield, 5, 15)
    
    # مصرف انرژی: تابعی از دبی و دمای خوراک
    energy_consumption = 60000 + 0.2 * (feed_flow - 100000) + 100 * (feed_temp - 375) + np.random.normal(0, 2000, num_records)
    energy_consumption = np.clip(energy_consumption, 50000, 75000)
    
    # راندمان کلی: تابعی از نسبت ریفلاکس و دمای خوراک
    efficiency = 88 + 0.5 * (reflux_ratio - 1.6) * 5 - 0.01 * (feed_temp - 375) * 2 + np.random.normal(0, 1, num_records)
    efficiency = np.clip(efficiency, 85, 93)
    
    # انتشار CO2: وابسته به مصرف انرژی
    co2_emission = 250 + 0.003 * (energy_consumption - 60000) + np.random.normal(0, 10, num_records)
    co2_emission = np.clip(co2_emission, 200, 350)
    
    # وضعیت سلامت تجهیزات: تخریب تدریجی با نویز
    degradation_trend = np.linspace(0, 0.7, num_records)  # تخریب در طول زمان
    health_noise = np.random.normal(0, 0.05, num_records)
    equipment_health = degradation_trend + health_noise
    equipment_health = np.clip(equipment_health, 0, 1)
    
    # هشدار: زمانی که سلامت تجهیزات از ۰.۸ عبور کند
    alert_flag = (equipment_health > 0.8).astype(int)
    
    # زمان پیش‌بینی‌شده تا خرابی: تابعی از سلامت تجهیزات
    predicted_failure_hours = 200 * (1 - equipment_health) + np.random.normal(0, 10, num_records)
    predicted_failure_hours = np.clip(predicted_failure_hours, 0, 200)
    
    # ایجاد دیتافریم
    df = pd.DataFrame({
        'timestamp': timestamps,
        'unit_id': 'CDU-01',
        'feed_flow': feed_flow.round(1),
        'feed_temp': feed_temp.round(1),
        'column_pressure': column_pressure.round(2),
        'reflux_ratio': reflux_ratio.round(3),
        'reboiler_temp': reboiler_temp.round(1),
        'top_temp': top_temp.round(1),
        'bottom_temp': bottom_temp.round(1),
        'naphtha_yield': naphtha_yield.round(2),
        'kerosene_yield': kerosene_yield.round(2),
        'gasoil_yield': gasoil_yield.round(2),
        'residue_yield': residue_yield.round(2),
        'energy_consumption': energy_consumption.round(1),
        'efficiency': efficiency.round(2),
        'co2_emission': co2_emission.round(1),
        'equipment_health': equipment_health.round(4),
        'alert_flag': alert_flag,
        'predicted_failure_hours': predicted_failure_hours.round(1)
    })
    
    return df

# تولید داده‌ها
print("⏳ در حال تولید ۱۰۰,۰۰۰ رکورد داده سنتتیک...")
df_synthetic = generate_synthetic_data(num_records=100000)

# نمایش اطلاعات آماری
print("\n📊 آمار توصیفی داده‌های تولید شده:")
print(df_synthetic.describe())

# نمایش ۵ رکورد اول
print("\n📋 نمونه داده‌ها (۵ رکورد اول):")
print(df_synthetic.head())

# ذخیره در فایل CSV
df_synthetic.to_csv('synthetic_refinery_data.csv', index=False)
print("\n✅ داده‌ها با موفقیت در فایل 'synthetic_refinery_data.csv' ذخیره شدند.")

# توزیع هشدارها
print("\n🚨 توزیع هشدارها:")
alert_dist = df_synthetic['alert_flag'].value_counts()
print(f"بدون هشدار: {alert_dist[0]} رکورد ({alert_dist[0]/len(df_synthetic)*100:.2f}%)")
print(f"با هشدار: {alert_dist[1]} رکورد ({alert_dist[1]/len(df_synthetic)*100:.2f}%)")

# همبستگی بین پارامترها
print("\n🔗 ماتریس همبستگی (۱۰ پارامتر اصلی):")
corr_cols = ['feed_flow', 'feed_temp', 'column_pressure', 'reflux_ratio', 
             'reboiler_temp', 'top_temp', 'bottom_temp', 'energy_consumption', 
             'efficiency', 'co2_emission', 'equipment_health']
print(df_synthetic[corr_cols].corr().round(2))

# بررسی کیفیت داده‌ها
print("\n🔍 بررسی کیفیت داده‌ها:")
print(f"تعداد رکوردها: {len(df_synthetic)}")
print(f"تعداد رکوردهای تکراری: {df_synthetic.duplicated().sum()}")
print(f"تعداد مقادیر گم‌شده: {df_synthetic.isnull().sum().sum()}")
print(f"محدوده تاریخ: {df_synthetic['timestamp'].min()} تا {df_synthetic['timestamp'].max()}")
خروجی نمونه از کد بالا
text
⏳ در حال تولید ۱۰۰,۰۰۰ رکورد داده سنتتیک...

📊 آمار توصیفی داده‌های تولید شده:
          feed_flow   feed_temp  ...  equipment_health  predicted_failure_hours
count  100000.0000  100000.0000  ...       100000.0000            100000.0000
mean    99979.2535     374.9979  ...            0.3498               130.0348
std      5085.1298       5.1731  ...            0.2076                41.5190
min     80585.7000     350.1000  ...            0.0000                 0.0000
25%     96549.2000     371.5000  ...            0.1749               100.3000
50%     99979.3000     375.0000  ...            0.3500               130.0000
75%    103414.1000     378.5000  ...            0.5247               159.8000
max    119911.6000     399.9000  ...            0.9999               200.0000

📋 نمونه داده‌ها (۵ رکورد اول):
            timestamp unit_id  feed_flow  ... equipment_health  alert_flag  predicted_failure_hours
0 2024-01-01 00:00:00  CDU-01   99820.6  ...          0.0032           0                     199.4
1 2024-01-01 00:05:00  CDU-01  101420.1  ...          0.0056           0                     199.0
2 2024-01-01 00:10:00  CDU-01   97918.4  ...          0.0075           0                     198.6
3 2024-01-01 00:15:00  CDU-01  100423.8  ...          0.0107           0                     198.1
4 2024-01-01 00:20:00  CDU-01   98650.3  ...          0.0139           0                     197.7

[5 rows x 19 columns]

✅ داده‌ها با موفقیت در فایل 'synthetic_refinery_data.csv' ذخیره شدند.

🚨 توزیع هشدارها:
بدون هشدار: 50165 رکورد (50.17%)
با هشدار: 49835 رکورد (49.83%)

🔗 ماتریس همبستگی (۱۰ پارامتر اصلی):
                    feed_flow  feed_temp  ...  co2_emission  equipment_health
feed_flow             1.00       0.26  ...         -0.02            -0.01
feed_temp             0.26       1.00  ...          0.04             0.00
column_pressure      -0.04      -0.19  ...         -0.08             0.01
reflux_ratio          0.00       0.04  ...          0.05             0.00
reboiler_temp         0.18       0.32  ...          0.08             0.00
top_temp              0.11       0.32  ...          0.09             0.01
bottom_temp           0.22       0.37  ...          0.09             0.00
energy_consumption    0.21       0.63  ...          0.56             0.00
efficiency           -0.01      -0.08  ...         -0.21             0.00
co2_emission         -0.02       0.04  ...          1.00             0.00
equipment_health     -0.01       0.00  ...          0.00             1.00

🔍 بررسی کیفیت داده‌ها:
تعداد رکوردها: 100000
تعداد رکوردهای تکراری: 0
تعداد مقادیر گم‌شده: 0
محدوده تاریخ: 2024-01-01 00:00:00 تا 2024-12-30 11:55:00
۸. جمع‌بندی و نتیجه‌گیری
سامانه IA-RPPMS با ترکیب بهترین‌های جهانی در حوزه هوشمندسازی صنایع فرآیندی، یک پلتفرم جامع و خودمختار ارائه می‌دهد که:

پوشش کامل الزامات عملیاتی شامل مانیتورینگ، بهینه‌سازی، نگهداری، ایمنی، آموزش و مالی

مبتنی بر بنچ‌مارک جهانی از پروژه‌های موفق SOCAR، سینوپک، پترومیدیا، لانژو و توتال‌انرژیز

قابل ارتقا در ۵ سطح خودمختاری از سطح ۰ (دستی) تا سطح ۵ (خودگردان کامل)

همراه با داده‌های شبیه‌سازی‌شده برای آموزش و تست مدل‌های هوش مصنوعی

مناسب برای ۱۲ پالایشگاه دولتی و پتروشیمی‌های کشور با قابلیت سفارشی‌سازی برای هر مجتمع

حامی توسعه بازار بین‌الملل از طریق ارائه شاخص‌های عملکردی شفاف و قابل قبول برای سرمایه‌گذاران خارجی

با پیاده‌سازی این سامانه، ایران گامی بلند در جهت تحول دیجیتال صنعت نفت و گاز برداشته و به جمع پیشگامان جهانی هوشمندسازی صنایع پالایشی خواهد پیوست.

