<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/estilos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="icon" href="img/dioelectricv3.svg">
    <title>DioElectric</title>
</head>
<body>
    <header>
        <img id="imagen" src="/img/dioelectricv3.svg" alt="logo de dioelectric">
        <h2 id="logo">DioElectric</h2>
        <input type="checkbox" id="check">
        <label for="check" class="mostrar-menu">
            &#8801
        </label>
        <nav class="menu">
            <a href="https://dioelectric.netlify.app/index.html">Inicio</a>
            <a href="https://dioelectric.netlify.app/nosotros.html">Sobre nosotros</a>
            <label for="check" class="esconder-menu">
                &#215
            </label>
        </nav>
    </header>
    <?php echo  'Hola mundo'; ?>
</body>