# Guía amigable: creación de usuarios, invitaciones y dashboard

Esta guía está pensada para una persona del equipo administrativo. El objetivo es que pueda crear usuarios, preparar su información, enviarles el correo de acceso y confirmar que puedan entrar al dashboard de Legalio.

## Antes de empezar

Antes de invitar a un usuario, confirma que tengas:

- Acceso de administrador al panel de Legalio.
- El nombre completo y correo correcto del usuario.
- El rol que tendrá la persona:
  - Arrendatario.
  - Propietario.
  - Administrador, solo para miembros internos del equipo.
- La propiedad relacionada, si aplica.
- El contrato de arrendamiento, si aplica.
- Los documentos que la persona debe consultar, por ejemplo contrato, recibos o inventario.

Recomendación: envía la invitación solo cuando la información principal ya esté cargada. Así, cuando el usuario entre por primera vez, encontrará su dashboard listo.

## 1. Crear el usuario

1. Ingresa al panel administrativo de Legalio.
2. Abre la sección `Usuarios`.
3. Haz clic en crear un nuevo usuario.
4. Completa estos datos:
   - Nombre completo.
   - Correo electrónico.
   - Rol del usuario.
5. Si el sistema pide una contraseña al crear el usuario, escribe una contraseña temporal interna. No se la envíes al usuario.
6. Guarda el usuario.

El usuario recibirá después un correo para crear su propia contraseña.

## 2. Flujo del arrendatario

### Paso 1: Verificar el usuario arrendatario

1. Entra a `Usuarios`.
2. Busca al arrendatario.
3. Revisa que:
   - El correo esté bien escrito.
   - El nombre esté completo.
   - El rol sea `Arrendatario`.

### Paso 2: Verificar o crear la propiedad

1. Entra a `Propiedades`.
2. Busca la propiedad relacionada con el arrendamiento.
3. Si no existe, créala.
4. Revisa que la propiedad tenga la información básica:
   - Nombre o título.
   - Dirección.
   - Ciudad.
   - Precio.
   - Tipo de propiedad.
   - Tipo de operación.
   - Área.
   - Habitaciones y baños, cuando aplique.

### Paso 3: Cargar los documentos del arrendatario

1. Entra a `Documentos`.
2. Crea o carga los documentos que debe ver el arrendatario.
3. Para cada documento, completa:
   - Título del documento.
   - Tipo de documento.
   - Arrendatario relacionado.
   - Contrato relacionado, si ya está creado.
   - Mes y año, si es un recibo.
4. Asegúrate de que el documento esté marcado como visible para el arrendatario.
5. Guarda cada documento.

Tipos de documentos frecuentes:

- Contrato.
- Inventario.
- Recibo de pago.
- Solicitud de arrendamiento.
- Otro.

### Paso 4: Crear o completar el contrato

1. Entra a `Contratos de arrendamiento`.
2. Crea un contrato nuevo o abre el contrato existente.
3. Completa la información principal:
   - Código del contrato.
   - Propiedad.
   - Propietario.
   - Arrendatario.
   - Fecha de inicio.
   - Fecha de finalización.
   - Canon mensual.
   - Depósito, si aplica.
   - Estado del contrato.
4. Asocia los documentos correspondientes:
   - Documento del contrato.
   - Inventario y acta de entrega.
   - Otros documentos, si aplica.
5. Guarda el contrato.

### Paso 5: Enviar el correo de invitación

1. Ingresa a Legalio con tu usuario administrador.
2. Entra al dashboard.
3. Abre la opción `Enviar invitaciones`.
4. Busca al arrendatario.
5. Haz clic en `Enviar invitación`.
6. Espera el mensaje de confirmación.

Si el usuario ya había recibido una invitación, puedes usar `Reenviar invitación`.

### Paso 6: Qué recibe el arrendatario

El arrendatario recibirá un correo de Legalio para crear o cambiar su contraseña.

La persona debe:

1. Abrir el correo.
2. Hacer clic en el botón para crear o cambiar contraseña.
3. Escribir una contraseña nueva.
4. Confirmar la contraseña.
5. Guardar.

El enlace del correo tiene una duración limitada. Si el usuario no lo usa a tiempo, se debe reenviar la invitación.

### Paso 7: Ingreso del arrendatario al dashboard

Después de crear su contraseña, el arrendatario debe:

1. Entrar a la página de inicio de sesión.
2. Escribir su correo.
3. Escribir su contraseña.
4. Hacer clic en ingresar.

Al entrar al dashboard, podrá consultar:

- Todos sus documentos.
- Contrato.
- Recibos.
- Inventario y acta de entrega.

En cada documento podrá usar las opciones de ver o descargar.

## 3. Flujo del propietario

### Paso 1: Verificar el usuario propietario

1. Entra a `Usuarios`.
2. Busca al propietario.
3. Revisa que:
   - El correo esté bien escrito.
   - El nombre esté completo.
   - El rol sea `Propietario`.

### Paso 2: Asociar el propietario al contrato

1. Entra a `Contratos de arrendamiento`.
2. Abre el contrato correspondiente.
3. En el campo de propietario, selecciona el usuario propietario.
4. Confirma que también esté seleccionado el arrendatario correcto.
5. Revisa que la propiedad sea la correcta.
6. Guarda el contrato.

### Paso 3: Enviar el correo de invitación al propietario

1. Ingresa a Legalio con tu usuario administrador.
2. Entra al dashboard.
3. Abre `Enviar invitaciones`.
4. Busca al propietario.
5. Haz clic en `Enviar invitación`.
6. Espera el mensaje de confirmación.

El propietario recibirá el mismo tipo de correo para crear su contraseña.

### Paso 4: Ingreso del propietario

El propietario debe:

1. Abrir el correo de invitación.
2. Crear su contraseña.
3. Entrar a la página de inicio de sesión.
4. Ingresar con su correo y contraseña.
5. Acceder al dashboard.

Nota importante: actualmente el dashboard de documentos está pensado principalmente para arrendatarios. El propietario puede tener usuario, recibir invitación e iniciar sesión, pero puede que no vea documentos asociados como propietario hasta que el sistema tenga una vista específica para ese rol.

## 4. Cómo saber si la invitación fue enviada

En la pantalla `Enviar invitaciones`, cada usuario puede aparecer con uno de estos estados:

- Pendiente por invitar: todavía no se le ha enviado el correo.
- Invitación enviada: ya se le envió el correo al menos una vez.

Si el usuario dice que no recibió el correo:

1. Verifica que el correo esté bien escrito.
2. Pídele revisar spam o correo no deseado.
3. Usa la opción `Reenviar invitación`.

## 5. Checklist antes de cerrar el caso

Antes de dar por terminado el proceso, confirma:

1. El usuario está creado.
2. El correo está correcto.
3. El rol está correcto.
4. La propiedad está creada o seleccionada.
5. El contrato está creado.
6. El contrato tiene propietario y arrendatario.
7. Los documentos están cargados.
8. Los documentos están asociados al arrendatario correcto.
9. Los documentos visibles están marcados para que el arrendatario los pueda ver.
10. La invitación fue enviada.
11. El usuario pudo crear su contraseña.
12. El usuario pudo iniciar sesión.
13. El arrendatario pudo ver o descargar sus documentos.

## 6. Problemas frecuentes

### El usuario no recibió el correo

Revisa que el correo esté bien escrito y reenvía la invitación. También pídele revisar la carpeta de spam o correo no deseado.

### El enlace ya no funciona

El enlace puede vencer. Reenvía la invitación desde la pantalla `Enviar invitaciones`.

### El usuario entra, pero no ve documentos

Revisa que los documentos estén asociados al arrendatario correcto y que estén marcados como visibles.

### El recibo no aparece

Revisa que el documento esté guardado como `Recibo de pago`, que tenga archivo cargado y que esté visible para el arrendatario.

### El propietario entra, pero no ve documentos

Esto puede pasar con el funcionamiento actual. El dashboard documental está enfocado en arrendatarios.

### El usuario no puede abrir o descargar un documento

Revisa que el documento tenga archivo cargado. Si el problema continúa, escálalo al equipo técnico.
