import { LangDictType } from "@/types/lang-types";

export const pl: LangDictType = {
  "login": {
    "header": "Logowanie",
  },

  "rental": {
    "header": "Wypożyczenie",
    "scannerOn": "Włącz skaner",
    "scannerOff": "Wyłącz skaner",

    "details": {
      "banner": {
        "message": "Zeskanowany kod kreskowy karty klienta",
        "button.details": "Szczegóły",
      },

      "table": {
        "column.number": "Lp.",
        "column.name": "Nazwa",
        "column.barcode": "Kod",
        "columns.charge": "Zapłata [PLN]",
        "columns.time": "Czas [dd hh:mm]",
      },
      
      "button.cancel": "Anuluj",
      "button.start": "Wypożycz",
      "button.scan": "Skanuj"
    }

  },

  "return": {
    "header": "Zwrot"
  },

  "more": {
    "header": "Więcej",
    "settings": "Ustawienia",
    "profile": "Mój profil",
    "about": "O aplikacji",
    "signOut": "Wyloguj",
  },

  "settings": {
    "header": "Ustawienia",
    "theme": {
      "title": "Motyw",
      "option.light": "Jasny",
      "option.dark": "Ciemny",
      "option.auto": "Systemowy",
    },
    "lang": {
      "title": "Język",
      "option.pl": "Polski",
      "option.en": "Angielski",
    },
  },

  "profile": {
    "header": "Mój profil",
    "list": {
      "firstName": "Imię",
      "middleName": "Drugie imię",
      "lastName": "Nazwisko",
      "email": "E-mail",
      "phoneNumber": "Numer telefonu",
      "dateJoined": "Data dołączenia",
    },
  },

  "about": {
    "header": "O aplikacji",
  },


  "components": {
    "form": { 
      "login": {
        "email.label": "E-mail",
        "email.error.empty": "Pole nie może być puste.",
        "email.error.invalid": "Niepoprawny adres e-mail.",
        "password.label": "Hasło",
        "password.error.empty": "Pole nie może być puste.",
        "password.error.tooShort": "Hasło jest zbyt krótkie.",
        "button": "Zaloguj się ",
      },
    },

    "errorDialog": {
      "title": "Wystapił błąd",
      "button": "Zamknij",
    },
  }
};