<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Calendario</title>
  <link rel="stylesheet" href="style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap">
  <script src="script.js" defer></script>
</head>
<body>
 <form method="post">
  <div class="wrapper">
    <header>
      <p class="current-date"></p>
      <div class="icons">
        <span id="prev" class="material-symbols-rounded">chevron_left</span>
        <span id="next" class="material-symbols-rounded">chevron_right</span>
      </div>
    </header>
    <div class="calendar">
      <ul class="weeks">
        <li>LUN</li>
        <li>MART</li>
        <li>MIER</li>
        <li>JUEV</li>
        <li>VIERN</li>
        <li>SAB</li>
        <li>DOM</li>
      </ul>
      <ul class="days"></ul>
    </div>
    <div>
      <p>Fecha seleccionada:</p>
      <input type="text" id="selectedDateField" readonly>
      <input type="text" id="name">
      <input type="submit" name="register">
    </div>
    <button id="sendRequestButton" style="display: none;">Enviar Solicitud</button>
   </div>
   <button id="seeVacations">ver vacaciones</button>
   <div id="vacaciones"></div>
  </form>
  <?php 
        include("guardar_evento.php");
        ?>
</body>
</html>
