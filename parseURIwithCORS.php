<?php
    header("Access-Control-Allow-Origin: *");
?>

<div id="scheme">Scheme-></div>
<div id="host">Host-></div>
<div id="port">Port-></div>
<div id="path">Path-></div>
<div id="query">Query-></div>
<div id="fragment">Fragment-></div>

<script>
    const parser = new URL(window.location.href);
    document.getElementById("scheme").innerText+=parser.protocol+'//';
    document.getElementById("host").innerText+=parser.hostname;
    document.getElementById("port").innerText+=':'+parser.port;
    document.getElementById("path").innerText+=parser.pathname;
    document.getElementById("query").innerText+=parser.search;
    document.getElementById("fragment").innerText+=parser.hash;
</script>
