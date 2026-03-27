function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');
var gatetype = 0;
var gatecontainer = [];
var gateoutcontainer = [];
var gateconnect1;
var gateconnect2;
var connectorfound = 0;
var startsim = 0;
var gatelink = [];
var undogatecontainer = [];
var undoconnectioncontainer = [];
var ANDcount = 0;
var ORcount = 0;
var NOTcount = 0;
var NANDcount = 0;
var YCcount = 0;
var GLcount = 0;
var DScount = 0;
var MUXcount = 0;
var undo;
var redo;
var distance = 0;
var distance1 = 0;
canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    //writeMessage(canvas, message);
}, false);
function mouseevt(x, y) {
    var mousePos = ({ x: x, y: y });
    if (startsim == 0) {
        if (gatetype == 1) {
            var o1 = new orgate("mycanvas", mousePos.x - 10, mousePos.y);
            o1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: o1, x: mousePos.x, y: mousePos.y, id: "OR" });
            ORcount++;
            if (ORcount == 1) {
                document.getElementById("OR").disabled = true;
                document.getElementById("OR").style.color = "grey";
            }
            sendmsg("Gate Placed");
        }
        else if (gatetype == 2) {
            var a1 = new andgate("mycanvas", mousePos.x - 10, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y, type: "AND" });
            ANDcount++;
            if (ANDcount == 2) {
                document.getElementById("AND").disabled = true;
                document.getElementById("AND").style.color = "grey";
            }
            sendmsg("Gate Placed");
        }
        else if (gatetype == 3) {
            var a1 = new notgate("mycanvas", mousePos.x - 10, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y, type: "NOT" });
            NOTcount++;
            if (NOTcount == 1) {
                document.getElementById("NOT").disabled = true;
                document.getElementById("NOT").style.color = "red";
            }
            sendmsg("Gate Placed");
        }
        else if (gatetype == 4) {
            var a1 = new norgate("mycanvas", mousePos.x - 10, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y, type: "NOR" });
            document.getElementById("NOR").disabled = true;
            document.getElementById("NOR").style.color = "grey";
            sendmsg("Gate Placed");
        }
        else if (gatetype == 5) {
            var a1 = new MUX("mycanvas", mousePos.x, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y, type: "MUX" });
            MUXcount++;
            if (MUXcount == 3) {
                document.getElementById("MUX").disabled = true;
                document.getElementById("MUX").style.color = "red";
            }
            sendmsg("2:1 MUX Placed");
        }
        else if (gatetype == 6) {
            var a1 = new nandgate("mycanvas", mousePos.x - 10, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y, type: "NAND" });
            NANDcount++;
            if (NANDcount == 11) {
                document.getElementById("NAND").disabled = true;
                document.getElementById("NAND").style.color = "grey";
            }
            sendmsg("Gate Placed");
        }
        else if (gatetype == 7) {
            var a1 = new divgate("mycanvas", mousePos.x - 10, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y, type: "YC" });
            YCcount++;
            if (YCcount == 2) {
                document.getElementById("YC").disabled = true;
                document.getElementById("YC").style.color = "red";
            }
            sendmsg("Y connector Placed");
        }
        else if (gatetype == 8) {
            var a1 = new bulb("mycanvas", mousePos.x - 10, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y, type: "GL" });
            sendmsg("Green Led Placed");
            GLcount++;
            if (GLcount == 1) {
                document.getElementById("GL").disabled = true;
                document.getElementById("GL").style.color = "red";
            }
        }
        else if (gatetype == 9) {
            var a1 = new dbulb("mycanvas", mousePos.x - 10, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y });
            sendmsg("Gate Placed");
        }
        else if (gatetype == 10) {
            var a1 = new bulbred("mycanvas", mousePos.x - 10, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y, type: "RL" });
            sendmsg("Gate Placed");
            BULBcount++;
            /* if(BULBcount==1)
             {
             document.getElementById("GL").disabled = true;
             document.getElementById("RL").disabled = true;
             document.getElementById("GL").style.color = "grey";
             document.getElementById("RL").style.color = "grey";
             }*/
        }
        else if (gatetype == 11) {
            var a1 = new bulbrg("mycanvas", mousePos.x - 10, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y });
            sendmsg("Gate Placed");
        }
        else if (gatetype == 16) {
            var a1 = new outgate("mycanvas", mousePos.x - 10, mousePos.y);
            a1.draw();
            gatetype = 0;
            gatecontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y, type: "DS" });
            gateoutcontainer.push({ gate: a1, x: mousePos.x, y: mousePos.y, type: "DS" });
            sendmsg("Digital Switch Placed");
            DScount++;
            if (DScount == 8) {
                document.getElementById("DS").disabled = true;
                document.getElementById("DS").style.color = "red";
            }
        }
        else if (gatetype == 12 && connectorfound == 0) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        // console.log(gateconnect[i].x,gateconnect[i].y);
                        sendmsg("Select second gate");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        sendmsg("Select second gate");
                        break;
                    }
                }
            }
        }
        else if (gatetype == 12 && connectorfound == 1) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink(gateconnect2, 1, 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 1, input: 1 });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink(gateconnect2, 1, 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 1, input: 1 });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                console.log(gatecontainer[i].type == "MUX");
                // console.log(gateconnect2.gate.x,gateconnect2.gate.y);
            }
        }
        else if (gatetype == 13 && connectorfound == 0) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        // console.log(gateconnect[i].x,gateconnect[i].y);
                        sendmsg("Select second gate");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        sendmsg("Select second gate");
                        break;
                    }
                }
            }
        }
        else if (gatetype == 13 && connectorfound == 1) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink(gateconnect2, 2, 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 1, input: 2 });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink(gateconnect2, 2, 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 1, input: 2 });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                console.log(gatecontainer[i].type == "MUX");
                // console.log(gateconnect2.gate.x,gateconnect2.gate.y);
            }
        }
        ///OUTPUT 2     
        else if (gatetype == 14 && connectorfound == 0) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        // console.log(gateconnect[i].x,gateconnect[i].y);
                        sendmsg("Select second gate");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        sendmsg("Select second gate");
                        break;
                    }
                }
            }
        }
        else if (gatetype == 14 && connectorfound == 1) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink1(gateconnect2, 2, 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 2, input: 2 });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink1(gateconnect2, 2, 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 2, input: 2 });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                console.log(gatecontainer[i].type == "MUX");
                // console.log(gateconnect2.gate.x,gateconnect2.gate.y);
            }
        }
        ////////////
        else if (gatetype == 15 && connectorfound == 0) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        // console.log(gateconnect[i].x,gateconnect[i].y);
                        sendmsg("Select second gate");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        sendmsg("Select second gate");
                        break;
                    }
                }
            }
        }
        else if (gatetype == 15 && connectorfound == 1) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink1(gateconnect2, 1, 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 2, input: 1 });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink1(gateconnect2, 1, 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 2, input: 1 });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                console.log(gatecontainer[i].type == "MUX");
                // console.log(gateconnect2.gate.x,gateconnect2.gate.y);
            }
        }
        ///IP 1 TO SELECT
        else if (gatetype == 50 && connectorfound == 0) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        // console.log(gateconnect[i].x,gateconnect[i].y);
                        sendmsg("Select second gate");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        sendmsg("Select second gate");
                        break;
                    }
                }
            }
        }
        else if (gatetype == 50 && connectorfound == 1) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink(gateconnect2, "S", 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 1, input: "S" });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink(gateconnect2, "S", 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 1, input: "S" });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                console.log(gatecontainer[i].type == "MUX");
                // console.log(gateconnect2.gate.x,gateconnect2.gate.y);
            }
        }
        /////IP 1 TO ENABLE
        else if (gatetype == 100 && connectorfound == 0) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        // console.log(gateconnect[i].x,gateconnect[i].y);
                        sendmsg("Select second gate");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        sendmsg("Select second gate");
                        break;
                    }
                }
            }
        }
        else if (gatetype == 100 && connectorfound == 1) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink(gateconnect2, "E", 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 1, input: "E" });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink(gateconnect2, "E", 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 1, input: "E" });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                console.log(gatecontainer[i].type == "MUX");
                // console.log(gateconnect2.gate.x,gateconnect2.gate.y);
            }
        }
        ///op 2 to SELECT
        else if (gatetype == 150 && connectorfound == 0) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        // console.log(gateconnect[i].x,gateconnect[i].y);
                        sendmsg("Select second gate");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        sendmsg("Select second gate");
                        break;
                    }
                }
            }
        }
        else if (gatetype == 150 && connectorfound == 1) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink1(gateconnect2, "S", 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 2, input: "S" });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink1(gateconnect2, "S", 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 2, input: "S" });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                console.log(gatecontainer[i].type == "MUX");
                // console.log(gateconnect2.gate.x,gateconnect2.gate.y);
            }
        }
        ////CONNECT OUTPUT2 TO ENABLE   
        else if (gatetype == 200 && connectorfound == 0) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        // console.log(gateconnect[i].x,gateconnect[i].y);
                        sendmsg("Select second gate");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 1;
                        gateconnect1 = gatecontainer[i].gate;
                        sendmsg("Select second gate");
                        break;
                    }
                }
            }
        }
        else if (gatetype == 200 && connectorfound == 1) {
            for (i = 0; i < gatecontainer.length; i++) {
                if (gatecontainer[i].type == "MUX") {
                    if (mousePos.x > gatecontainer[i].x && mousePos.x < (gatecontainer[i].x + 75) && mousePos.y > gatecontainer[i].y && mousePos.y < (gatecontainer[i].y + 100)) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink1(gateconnect2, "E", 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 2, input: "E" });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                else {
                    distance = 25;
                    distance1 = 25;
                    if (Math.abs(gatecontainer[i].x - mousePos.x) < distance && Math.abs(gatecontainer[i].y - mousePos.y) < distance1) {
                        connectorfound = 0;
                        gateconnect2 = gatecontainer[i].gate;
                        gateconnect1.outlink1(gateconnect2, "E", 1);
                        gatelink.push({ gate1: gateconnect1, gate2: gateconnect2, output: 2, input: "E" });
                        gateconnect1 = null;
                        gateconnect2 = null;
                        gatetype = 0;
                        sendmsg("Connection Completed");
                        break;
                    }
                }
                console.log(gatecontainer[i].type == "MUX");
                // console.log(gateconnect2.gate.x,gateconnect2.gate.y);
            }
        }
    }
    else {
        for (i = 0; i < gateoutcontainer.length; i++) {
            if (Math.abs(gateoutcontainer[i].x - mousePos.x) < 25 && Math.abs(gateoutcontainer[i].y - mousePos.y) < 25) {
                gateconnect1 = gateoutcontainer[i].gate;
                if (gateconnect1.ou == 0) {
                    gateconnect1.setip1(1);
                }
                else {
                    gateconnect1.setip1(0);
                }
                draw();
                break;
            }
        }
    }
}
function addorgate() {
    if (startsim == 0) {
        gatetype = 1;
        sendmsg("Place OR gate");
    }
}
function addandgate() {
    if (startsim == 0) {
        gatetype = 2;
        sendmsg("Place AND gate");
    }
}
function addnotgate() {
    if (startsim == 0) {
        gatetype = 3;
        sendmsg("Place NOT gate");
    }
}
function addnorgate() {
    if (startsim == 0) {
        gatetype = 4;
        sendmsg("Place NOR gate");
    }
}
function addMUXgate() {
    if (startsim == 0) {
        gatetype = 5;
        sendmsg("Place  2:1 MUX");
    }
}
function addnandgate() {
    if (startsim == 0) {
        gatetype = 6;
        sendmsg("Place NAND gate");
    }
}
function adddivgate(num) {
    if (startsim == 0) {
        gatetype = 7;
        Ycount = num;
        sendmsg("Place Y connector");
    }
}
function addbulbgate() {
    if (startsim == 0) {
        gatetype = 8;
        sendmsg("Place green Led");
    }
}
function adddbulbgate() {
    gatetype = 9;
}
function addbulredbgate() {
    if (startsim == 0) {
        gatetype = 10;
        sendmsg("Place red Led");
    }
}
function addbulbrggate() {
    gatetype = 11;
}
function connector1() {
    if (startsim == 0) {
        gateconnect1 = null;
        gateconnect2 = null;
        connectorfound = 0;
        gatetype = 12;
        sendmsg("Select first gate");
    }
}
function connector2() {
    if (startsim == 0) {
        gateconnect1 = null;
        gateconnect2 = null;
        gatetype = 13;
        connectorfound = 0;
        sendmsg("Select first gate");
    }
}
function connector3() {
    if (startsim == 0) {
        gateconnect1 = null;
        gateconnect2 = null;
        gatetype = 14;
        connectorfound = 0;
        sendmsg("Select first gate");
    }
}
function connector4() {
    if (startsim == 0) {
        gateconnect1 = null;
        gateconnect2 = null;
        gatetype = 15;
        connectorfound = 0;
        sendmsg("Select first gate");
    }
}
/////Changes for MUX SELECT
function connectorS_output1() {
    if (startsim == 0) {
        gateconnect1 = null;
        gateconnect2 = null;
        connectorfound = 0;
        gatetype = 50;
        sendmsg("Select first gate");
    }
}
function connectorE_output1() {
    if (startsim == 0) {
        gateconnect1 = null;
        gateconnect2 = null;
        connectorfound = 0;
        gatetype = 100;
        sendmsg("Select first gate");
    }
}
function connectorS_output2() {
    if (startsim == 0) {
        gateconnect1 = null;
        gateconnect2 = null;
        connectorfound = 0;
        gatetype = 150;
        sendmsg("Select first gate");
    }
}
function connectorE_output2() {
    if (startsim == 0) {
        gateconnect1 = null;
        gateconnect2 = null;
        connectorfound = 0;
        gatetype = 200;
        sendmsg("Select first gate");
    }
}
function addoutgate() {
    if (startsim == 0) {
        gatetype = 16;
        sendmsg("Place Digital Switch");
    }
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < gatecontainer.length; i++) {
        var a1 = gatecontainer[i].gate;
        a1.draw();
    }
    for (i = 0; i < gatelink.length; i++) {
        var a1 = gatelink[i].gate1;
        var a2 = gatelink[i].gate2;
        var output = gatelink[i].output;
        var input = gatelink[i].input;
        if (output == 1) {
            a1.outlink(a2, input, 1);
        }
        else if (output == 2) {
            a1.outlink1(a2, input, 1);
        }
    }
}
function startsim1() {
    startsim = 1;
    sendmsg("Simulator Started ");
    for (i = 0; i < gateoutcontainer.length; i++) {
        gateconnect1 = gateoutcontainer[i].gate;
        gateconnect1.setip1(0);
    }
}
function stopsim1() {
    startsim = 0;
    sendmsg("Simulator Stoped ");
}
function reset() {
    gatetype = 0;
    gatecontainer = [];
    gateoutcontainer = [];
    gateconnect1 = null;
    gateconnect2 = null;
    connectorfound = 0;
    startsim = 0;
    gatelink = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    sendmsg("Reset Sucessful ");
    ANDcount = 0;
    ORcount = 0;
    NOTcount = 0;
    NANDcount = 0;
    YCcount = 0;
    GLcount = 0;
    DScount = 0;
    MUXcount = 0;
    undo;
    redo;
    distance = 0;
    distance1 = 0;
    document.getElementById("MUX").disabled = false;
    document.getElementById("DS").disabled = false;
    document.getElementById("YC").disabled = false;
    document.getElementById("GL").disabled = false;
    document.getElementById("NOT").disabled = false;
    document.getElementById("MUX").style.color = "blue";
    document.getElementById("DS").style.color = "blue";
    document.getElementById("YC").style.color = "blue";
    document.getElementById("GL").style.color = "blue";
    document.getElementById("NOT").style.color = "blue";
}
function sendmsg(msg) {
    document.getElementById("l1").innerHTML = msg;
}
function undoGate() {
    if (startsim == 0) {
        if (gatecontainer.length > 0) {
            var temp = gatecontainer.pop();
            undogatecontainer.push(temp);
            draw();
            if (temp.type == "MUX") {
                sendmsg("UNDO 2:1 MUX DONE");
                MUXcount--;
                document.getElementById("MUX").disabled = false;
                document.getElementById("MUX").style.color = "blue";
            }
            if (temp.type == "NOT") {
                sendmsg("UNDO GATE DONE");
                NOTcount--;
                document.getElementById("NOT").disabled = false;
                document.getElementById("NOT").style.color = "blue";
            }
            if (temp.type == "YC") {
                sendmsg("UNDO Y-CONNECTOR DONE");
                YCcount--;
                document.getElementById("YC").disabled = false;
                document.getElementById("YC").style.color = "blue";
            }
            if (temp.type == "GL") {
                sendmsg("UNDO GREEN-LED DONE");
                GLcount--;
                document.getElementById("GL").disabled = false;
                document.getElementById("GL").style.color = "blue";
            }
            if (temp.type == "DS") {
                sendmsg("UNDO SWITCH DONE");
                DScount--;
                document.getElementById("DS").disabled = false;
                document.getElementById("DS").style.color = "blue";
            }
        }
        else {
            sendmsg("Cannot UNDO ELEMENT");
        }
    }
    else {
        sendmsg("Cannot UNDO ELEMENT");
    }
}
function undoConnection() {
    if (startsim == 0) {
        if (gatelink.length > 0) {
            undoconnectioncontainer.push(gatelink.pop());
            draw();
            sendmsg("UNDO CONNECTION DONE");
        }
        else {
            sendmsg("Cannot UNDO CONNECTION");
        }
    }
    else {
        sendmsg("Cannot UNDO CONNECTION");
    }
}
function redoGate() {
    if (startsim == 0) {
        if (undogatecontainer.length > 0) {
            var temp = undogatecontainer.pop();
            gatecontainer.push(temp);
            draw();
            if (temp.type == "MUX") {
                sendmsg("REDO 2:1 MUX DONE");
                MUXcount++;
                if (MUXcount == 3) {
                    document.getElementById("MUX").disabled = true;
                    document.getElementById("MUX").style.color = "red";
                }
            }
            if (temp.type == "NOT") {
                sendmsg("REDO GATE DONE");
                NOTcount++;
                if (NOTcount == 1) {
                    document.getElementById("NOT").disabled = true;
                    document.getElementById("NOT").style.color = "red";
                }
            }
            if (temp.type == "YC") {
                sendmsg("REDO Y-CONNECTOR DONE");
                YCcount++;
                if (YCcount == 2) {
                    document.getElementById("YC").disabled = true;
                    document.getElementById("YC").style.color = "red";
                }
            }
            if (temp.type == "GL") {
                sendmsg("REDO GREEN-LED DONE");
                GLcount++;
                if (GLcount == 1) {
                    document.getElementById("GL").disabled = true;
                    document.getElementById("GL").style.color = "red";
                }
            }
            if (temp.type == "DS") {
                sendmsg("REDO SWITCH DONE");
                DScount++;
                if (DScount == 8) {
                    document.getElementById("DS").disabled = true;
                    document.getElementById("DS").style.color = "red";
                }
            }
        }
        else {
            sendmsg("Cannot REDO ELEMENT");
        }
    }
    else {
        sendmsg("Cannot REDO ELEMENT");
    }
}
function redoConnection() {
    if (startsim == 0) {
        if (undoconnectioncontainer.length > 0) {
            gatelink.push(undoconnectioncontainer.pop());
            draw();
            sendmsg("REDO CONNECTION DONE");
        }
        else {
            sendmsg("Cannot REDO CONNECTION");
        }
    }
    else {
        sendmsg("Cannot REDO CONNECTION");
    }
}
//# sourceMappingURL=GEN_MUX1.js.map