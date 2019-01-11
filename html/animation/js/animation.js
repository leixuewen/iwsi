let animation = {
    waves: {
        attr: "waves",
        runWaves(el) {
            if (el.tagName === "HTML") return;
            if (!el.attributes[this.attr]) {
                return this.runWaves(el.parentNode);
            }
            let w = document.createElement("waves"), time = 640, R = time;
            if (el === null) return;
            el.style.overflow = "hidden";
            el.style.position = "relative";
            w.style.width = R + "px";
            w.style.height = R + "px";
            w.style.left = (event.clientX - el.offsetLeft - R / 2) + "px";
            w.style.top = (event.clientY - el.offsetTop - R / 2) + "px";
            w.style.display = "inline-block";
            w.style.borderRadius = "50%";
            w.style.background = "#fff";
            w.style.opacity = "0.6";
            w.style.position = "absolute";
            w.style.transform = "scale(0)";
            w.style.transition = "all " + time + "ms";
            el.append(w);
            setTimeout(() => {
                w.style.transform = "scale(1)";
                w.style.opacity = "0";
            });
            setTimeout(() => {
                w.remove();
            }, time);
        },
        listenerWaves() {
            this.runWaves(event.srcElement);
        }
    }
};

document.addEventListener("click", () => {
    animation.waves.listenerWaves();
});
