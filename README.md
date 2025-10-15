# Bajki z Trzech Słów 🌙✨

Landing page dla projektu generującego bajki dla dzieci na podstawie trzech słów kluczowych oraz morału.

![Bajki z Trzech Słów](glowny.jpg)

## 📚 O projekcie

"Bajki z Trzech Słów" to innowacyjne narzędzie, które:
- Generuje unikalne bajki na podstawie trzech słów podanych przez użytkownika
- Tworzy ilustracje do każdej historii
- Dodaje profesjonalną narrację z podkładem muzycznym
- Przekazuje wartościowe morały dzieciom

## 🚀 Szybki start

### Wymagania
- Node.js (wersja 14 lub nowsza)
- Konto Resend (do wysyłania emaili)

### Instalacja

1. Sklonuj repozytorium lub pobierz pliki projektu

2. Zainstaluj zależności:
```bash
npm install
```

3. Skonfiguruj zmienne środowiskowe:
   - Skopiuj plik `.env.example` jako `.env`
   - Uzupełnij dane:
```bash
cp .env.example .env
```

4. Edytuj plik `.env`:
```env
RESEND_API_KEY=re_TWOJ_KLUCZ_API
ADMIN_EMAIL=twoj-email@example.com
PORT=3000
```

### Uzyskanie klucza API Resend

1. Zarejestruj się na [https://resend.com](https://resend.com)
2. Przejdź do [API Keys](https://resend.com/api-keys)
3. Stwórz nowy klucz API
4. Skopiuj klucz i wklej do pliku `.env`

### Uruchomienie aplikacji

Tryb produkcyjny:
```bash
npm start
```

Tryb developerski (z automatycznym restartem):
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: [http://localhost:3000](http://localhost:3000)

## 📧 Konfiguracja emaili

Aplikacja używa Resend API do wysyłania emaili. Po otrzymaniu formularza:
1. Wysyła email z danymi zamówienia na adres administratora
2. Wysyła potwierdzenie do klienta

### Ważne informacje o Resend

- W wersji darmowej możesz wysłać do 100 emaili miesięcznie
- Domyślnie emaile są wysyłane z domeny `onboarding@resend.dev`
- Aby używać własnej domeny, musisz ją zweryfikować w panelu Resend

## 🎨 Struktura projektu

```
bajki_z_3_slow_page/
├── index.html          # Główna strona landing page
├── server.js           # Serwer Express z API
├── glowny.jpg         # Główny obrazek
├── package.json       # Zależności projektu
├── .env.example       # Przykładowa konfiguracja
└── README.md          # Ten plik
```

## 🛠️ Technologie

- **Frontend**: HTML5, Tailwind CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Email**: Resend API
- **Styling**: Tailwind CSS (CDN)
- **Fonts**: Google Fonts (Comfortaa, Quicksand)

## 📱 Funkcjonalności

- ✅ Responsywny design (mobile-first)
- ✅ Animacje CSS dla lepszego UX
- ✅ Formularz kontaktowy z walidacją
- ✅ Automatyczne wysyłanie emaili
- ✅ Potwierdzenie zamówienia
- ✅ Estetyczny, bajkowy design

## 🔧 Dostosowywanie

### Zmiana kolorów
Kolory są zdefiniowane w klasach Tailwind CSS. Główna paleta:
- Purple (główny kolor): `purple-500`, `purple-600`, `purple-700`
- Pink (akcent): `pink-500`, `pink-600`
- Tła: gradientowe, pastelowe

### Zmiana treści emaili
Szablony emaili znajdują się w pliku `server.js`:
- `adminEmailContent` - email dla administratora
- `customerEmailContent` - email dla klienta

### Dodawanie nowych sekcji
Strona używa struktury sekcji HTML5. Każda sekcja ma:
- Klasę `relative z-10` dla właściwego pozycjonowania
- Padding responsywny: `py-12 md:py-20 px-4`
- Kontener: `max-w-6xl mx-auto`

## 📝 Do zrobienia

- [ ] Integracja z AI do generowania bajek
- [ ] System logowania użytkowników
- [ ] Panel administracyjny
- [ ] Automatyczne generowanie obrazków
- [ ] Generowanie audio z lektorem
- [ ] System płatności
- [ ] Biblioteka wygenerowanych bajek

## 🤝 Wsparcie

Jeśli masz pytania lub problemy:
1. Sprawdź czy wszystkie zmienne środowiskowe są poprawnie ustawione
2. Upewnij się, że masz aktywny klucz API Resend
3. Sprawdź logi serwera w konsoli

## 📄 Licencja

MIT

## 👨‍💻 Autor

Projekt stworzony przez Adama – AI Story Creator ✨

---

**Uwaga**: To jest wersja demonstracyjna landing page. Pełna funkcjonalność generowania bajek wymaga dodatkowej integracji z AI oraz systemami generowania obrazów i dźwięku.