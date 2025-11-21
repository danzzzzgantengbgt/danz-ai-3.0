function dummyReply(text) {
    const t = text.toLowerCase();

    const nameKW = [
        "nama kamu", "namamu", "kamu siapa", "siapa kamu",
        "siapa namamu", "nama mu", "lu siapa"
    ];

    for (let k of nameKW) {
        if (t.includes(k)) return "Aku adalah Danz AI.";
    }

    const devKW = [
        "yang buat kamu", "siapa pembuatmu", "developer",
        "yang bikin kamu", "siapa yang membuatmu",
        "dibuat oleh siapa", "penciptamu"
    ];

    for (let k of devKW) {
        if (t.includes(k)) return "Aku dibuat oleh Aldan.";
    }

    return null;
}

function addMessage(text, sender) {
    const chat = document.getElementById("chat");

    const msg = document.createElement("div");
    msg.className = `message ${sender}`;

    msg.innerHTML = `
        <div class="bubble">${text}</div>
    `;

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function addTyping() {
    const chat = document.getElementById("chat");

    const t = document.createElement("div");
    t.id = "typing";
    t.className = "message bot";
    t.innerHTML = `<div class="bubble typing">Danz AI sedang mengetik...</div>`;
    chat.appendChild(t);
    chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById("typing");
    if (t) t.remove();
}

async function sendMessage() {
    const input = document.getElementById("msg");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const dummy = dummyReply(text);
    if (dummy) {
        setTimeout(() => addMessage(dummy, "bot"), 300);
        return;
    }

    addTyping();

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    removeTyping();
    addMessage(data.reply || "Terjadi kesalahan", "bot");
  }
