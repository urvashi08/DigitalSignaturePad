const canvas = document.getElementById("signatureCanvas");
        const context = canvas.getContext("2d");
        const clearButton = document.getElementById("clearButton");
        const downloadButton = document.getElementById("downloadButton");
        const colorButtons = document.querySelectorAll(".colorButton");

        let isDrawing = false;
        let signatureColor = "black";

        function setSignatureColor(color) {
            signatureColor = color;
            context.strokeStyle = signatureColor;

            colorButtons.forEach(button => button.classList.remove("selected"));

            document.getElementById(`${color}Color`).classList.add("selected");
        }

        setSignatureColor("black");

        colorButtons.forEach(button => {
            button.addEventListener("click", () => {
                const color = button.id.replace("Color", "").toLowerCase();
                setSignatureColor(color);
            });
        });

        canvas.addEventListener("mousedown", () => {
            isDrawing = true;
            context.beginPath();
            context.moveTo(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
        });

        canvas.addEventListener("mousemove", () => {
            if (isDrawing) {
                context.lineTo(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
                context.stroke();
            }
        });

        canvas.addEventListener("mouseup", () => {
            isDrawing = false;
        });

        canvas.addEventListener("mouseout", () => {
            isDrawing = false;
        });

        clearButton.addEventListener("click", () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        });

        downloadButton.addEventListener("click", () => {
            const downloadCanvas = document.createElement("canvas");
            downloadCanvas.width = canvas.width;
            downloadCanvas.height = canvas.height;
            const downloadContext = downloadCanvas.getContext("2d");
            downloadContext.fillStyle = "white";
            downloadContext.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);
            downloadContext.drawImage(canvas, 0, 0);

            const a = document.createElement("a");
            a.href = downloadCanvas.toDataURL();
            a.download = "signature.png";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });