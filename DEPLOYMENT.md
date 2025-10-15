# 🚀 Przewodnik deploymentu - Bajki z Trzech Słów

## Opcje hostingu

### Opcja 1: Vercel (REKOMENDOWANA) ⭐
**Zalety:** Darmowy, obsługuje Node.js, automatyczne deploye z GitHub, świetna wydajność

#### Kroki:
1. **Przygotuj repozytorium na GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TWOJA-NAZWA/bajki-z-3-slow.git
   git push -u origin main
   ```

2. **Zarejestruj się na Vercel:**
   - Wejdź na [vercel.com](https://vercel.com)
   - Zaloguj się przez GitHub

3. **Zaimportuj projekt:**
   - Kliknij "New Project"
   - Wybierz repozytorium z GitHub
   - Vercel automatycznie wykryje konfigurację z `vercel.json`

4. **Skonfiguruj zmienne środowiskowe:**
   - W ustawieniach projektu przejdź do "Environment Variables"
   - Dodaj:
     - `RESEND_API_KEY` = twój klucz z Resend
     - `ADMIN_EMAIL` = twój email

5. **Deploy:**
   - Kliknij "Deploy"
   - Twoja strona będzie dostępna pod adresem: `https://nazwa-projektu.vercel.app`

---

### Opcja 2: Netlify + Netlify Functions
**Zalety:** Darmowy, serverless functions, łatwa konfiguracja

#### Kroki:
1. **Przebuduj backend na Netlify Functions:**
   Stwórz folder `netlify/functions/` i przenieś logikę do `send-email.js`

2. **Stwórz plik `netlify.toml`:**
   ```toml
   [build]
     publish = "."
   
   [functions]
     directory = "netlify/functions"
   ```

3. **Deploy przez Netlify:**
   - Zaloguj się na [netlify.com](https://netlify.com)
   - Przeciągnij folder projektu lub połącz z GitHub
   - Dodaj zmienne środowiskowe w Settings

---

### Opcja 3: GitHub Pages + EmailJS (BEZ BACKENDU) 📧
**Zalety:** 100% darmowy, hostowany przez GitHub
**Wady:** Brak backendu Node.js, trzeba użyć zewnętrznego serwisu email

#### Kroki:

1. **Skonfiguruj EmailJS:**
   - Zarejestruj się na [emailjs.com](https://www.emailjs.com)
   - Stwórz "Email Service" (np. Gmail)
   - Stwórz "Email Template" z polami:
     ```
     Imię: {{user_name}}
     Email: {{user_email}}
     Słowa: {{words}}
     Morał: {{moral}}
     ```
   - Skopiuj: Service ID, Template ID, Public Key

2. **Zaktualizuj `index-static.html`:**
   ```javascript
   // Zmień te wartości na swoje z EmailJS
   emailjs.init("YOUR_PUBLIC_KEY");
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```

3. **Zmień nazwę pliku:**
   ```bash
   mv index-static.html index.html
   rm server.js package.json  # Usuń pliki backendu
   ```

4. **Włącz GitHub Pages:**
   - Wejdź w Settings repozytorium
   - Przejdź do "Pages"
   - Source: Deploy from a branch
   - Branch: main, folder: / (root)
   - Kliknij Save

5. **Twoja strona będzie dostępna:**
   `https://TWOJA-NAZWA.github.io/bajki-z-3-slow/`

---

### Opcja 4: Render.com
**Zalety:** Darmowy tier, obsługuje Node.js
**Wady:** Wolniejszy start po nieaktywności

#### Kroki:
1. Zarejestruj się na [render.com](https://render.com)
2. Połącz z GitHub
3. New > Web Service
4. Wybierz repozytorium
5. Konfiguracja:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Dodaj zmienne środowiskowe
7. Deploy

---

### Opcja 5: Railway.app
**Zalety:** Bardzo łatwy deploy, dobre wsparcie dla Node.js
**Wady:** Ograniczony darmowy tier

#### Kroki:
1. Zainstaluj Railway CLI lub użyj strony
2. `railway login`
3. `railway init`
4. `railway up`
5. Dodaj zmienne środowiskowe w dashboardzie

---

## 📝 Porównanie opcji

| Opcja | Darmowy | Backend | Łatwość | Wydajność | Custom Domain |
|-------|---------|---------|---------|-----------|---------------|
| Vercel | ✅ Tak | ✅ Node.js | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Tak |
| Netlify | ✅ Tak | ✅ Functions | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ Tak |
| GitHub Pages | ✅ Tak | ❌ Nie | ⭐⭐⭐ | ⭐⭐⭐ | ✅ Tak |
| Render | ✅ Tak* | ✅ Node.js | ⭐⭐⭐ | ⭐⭐ | ✅ Tak |
| Railway | ⚠️ Limit | ✅ Node.js | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ Tak |

*Render - wolniejszy start po 15 min nieaktywności

---

## 🔑 Konfiguracja Resend API (dla opcji z backendem)

1. **Zarejestruj się na Resend:**
   - Wejdź na [resend.com](https://resend.com)
   - Potwierdź email

2. **Stwórz API Key:**
   - Dashboard > API Keys
   - Create API Key
   - Skopiuj klucz (pokaże się tylko raz!)

3. **Weryfikacja domeny (opcjonalnie):**
   - Aby wysyłać z własnej domeny
   - Domains > Add Domain
   - Dodaj rekordy DNS

---

## 🎯 Rekomendacja

**Dla początkujących:** GitHub Pages + EmailJS
- Najprostsza opcja
- Nie wymaga konfiguracji backendu
- 100% darmowa

**Dla najlepszej jakości:** Vercel
- Profesjonalne rozwiązanie
- Obsługuje pełny backend
- Automatyczne deploye z GitHub
- Świetna wydajność

---

## 🆘 Rozwiązywanie problemów

### "Build failed" na Vercel/Netlify
- Sprawdź czy wszystkie zależności są w `package.json`
- Upewnij się, że Node version jest kompatybilna

### Emaile nie dochodzą
- Sprawdź klucz API
- Sprawdź spam
- Dla EmailJS: sprawdź limity (200 emaili/miesiąc darmowo)
- Dla Resend: sprawdź limity (100 emaili/dzień darmowo)

### Strona nie ładuje się na GitHub Pages
- Sprawdź czy GitHub Pages jest włączone w Settings
- Poczekaj 5-10 minut na pierwszy deploy
- Sprawdź czy `index.html` jest w głównym folderze

### CORS errors z EmailJS
- Upewnij się, że używasz właściwego Public Key
- Sprawdź czy domena jest dodana w EmailJS dashboard

---

## 📚 Przydatne linki

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Resend Documentation](https://resend.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

## ✨ Wskazówki

1. **Zawsze testuj lokalnie najpierw:**
   ```bash
   npm start
   ```

2. **Używaj .env dla wrażliwych danych**
   - Nigdy nie commituj kluczy API do GitHub!

3. **Monitoruj użycie:**
   - Sprawdzaj limity darmowych tierów
   - EmailJS: 200 emaili/miesiąc
   - Resend: 3000 emaili/miesiąc
   - Vercel: 100GB bandwidth/miesiąc

4. **Backup:**
   - Regularnie rób kopie zapasowe
   - Używaj git tags dla ważnych wersji

5. **Custom domain:**
   - Większość platform pozwala na darmowe podpięcie własnej domeny
   - Kup domenę na np. Namecheap, OVH, lub nazwa.pl

Powodzenia z deploymentem! 🚀🌙✨