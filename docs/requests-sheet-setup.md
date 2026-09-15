# Cola de solicitudes en Google Sheets ("el Excel" del cliente)

Registro **aditivo** de las solicitudes del formulario en una Google Sheet, en orden
de llegada (la más reciente arriba). **No reemplaza EmailJS**: el correo sigue siendo
la fuente principal y el registro en la planilla es best-effort (si falla, el envío
del correo no se ve afectado).

## Arquitectura

```
Formulario (sraircorp.com)
   ├──> EmailJS  ──► correo a srair.contracting@gmail.com   (fuente principal, intacta)
   └──> Apps Script Web App ──► Google Sheet (cola ordenada)
```

## Setup (una sola vez, ~5 min)

### 1. Crear la planilla

- Entrá a https://sheets.new con la cuenta Google que debe ver la cola
  (recomendado: la del cliente, `srair.contracting@gmail.com` — así la ve en su Drive).
- Dejá la hoja en blanco (el script crea el encabezado solo).

### 2. Pegar el script

- En la planilla: **Extensiones → Apps Script**.
- Borrá el contenido de `Code.gs` y pegá esto:

```javascript
const SHEET_NAME = 'Solicitudes';
const TOKEN = 'PON_AQUI_UN_SECRETO_LARGO';

const HEADERS = ['Recibida', 'Cliente', 'Correo', 'Teléfono', 'Servicio', 'Mensaje', 'Atendida'];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (!body || body.token !== TOKEN) return reply_(401, 'bad token');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }

    const row = [
      new Date(),
      body.client || '',
      body.email || '',
      body.phone || '',
      body.service || '',
      body.message || '',
      '', // Atendida: marcarla a mano cuando se atienda
    ];
    sheet.insertRowBefore(2); // la más reciente siempre arriba
    sheet.getRange(2, 1, 1, row.length).setValues([row]);

    return reply_(200, 'ok');
  } catch (err) {
    return reply_(500, String(err));
  }
}

function reply_(code, msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ code, msg }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

- **Cambiá `TOKEN`** por un secreto largo y único (el mismo valor que pondremos en
  `src/config/requests-sheet.js`). Protege el endpoint público contra spam.

### 3. Desplegar como Web App

- Clic en **Deploy → New deployment**.
- Tipo: **Web app**.
  - **Description**: `contact-form-queue`
  - **Execute as**: `Me` (la cuenta dueña de la planilla)
  - **Who has access**: `Anyone`
- **Deploy** → copiá la **URL del Web App** (termina en `/exec`).
- Pasásela al desarrollador (nosotros) para ponerla en la config.

### 4. Activar en el sitio

- En `src/config/requests-sheet.js`:
  - `REQUEST_SHEET_WEBHOOK_URL = '<la URL /exec>'`
  - `REQUEST_SHEET_TOKEN = '<el mismo TOKEN del script>'`
- Build, commit y push → Vercel despliega.

## Uso diario del cliente

- Abre la planilla `Solicitudes` en su Google Drive.
- Columna **Recibida** = fecha/hora de llegada; la más reciente está arriba.
- Para atender en orden de llegada: ordenar por **Recibida** ascendente y marcar
  la columna **Atendida** (por ejemplo `X`) cuando se procese la solicitud.
- Para bajar un Excel `.xlsx`: **Archivo → Descargar → Microsoft Excel (.xlsx)**.

## Notas / límites

- El Apps Script gratuito tiene límite de ~20.000 ejecuciones/día — irrelevante acá.
- La planilla se inserta en el Drive de la cuenta con la que crees el Script Web App.
- El token viaja en el body del POST (HTTPS) — suficiente contra spam casual.
- Si alguna vez la planilla falla, **el correo igual llega** (EmailJS es independiente).