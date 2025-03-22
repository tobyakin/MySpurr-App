export const displayTextWithLinks = (text) => {
    if (!text) return "";

    // Parse the HTML message properly
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    // Replace <oembed> tags with iframes
    doc.querySelectorAll("oembed").forEach(oembed => {
        const url = oembed.getAttribute("url");

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            // Convert to embeddable YouTube format
            const videoId = url.split("v=")[1]?.split("&")[0]; // Extract video ID
            if (videoId) {
                const iframe = document.createElement("iframe");
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.width = "100%";
                iframe.height = "200";
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allowfullscreen", "true");

                oembed.replaceWith(iframe);
            }
        }
    });

    // Function to detect and replace links and emails within text nodes
    function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const matches = discoverLinksAndEmails(node.nodeValue);
            if (matches.length > 0) {
                let newHTML = "";
                let lastIndex = 0;
                matches.forEach(match => {
                    newHTML += node.nodeValue.slice(lastIndex, match.index);
                    if (match.type === "url") {
                        newHTML += `<a href="${match.value}" target="_blank" class="styled-link">${match.value}</a>`;
                    } else if (match.type === "email") {
                        newHTML += `<a href="mailto:${match.value}" class="styled-link">${match.value}</a>`;
                    }
                    lastIndex = match.index + match.length;
                });
                newHTML += node.nodeValue.slice(lastIndex);

                const span = document.createElement("span");
                span.innerHTML = newHTML;
                node.replaceWith(span);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            Array.from(node.childNodes).forEach(child => processNode(child));
        }
    }

    // Process all nodes in the parsed document
    Array.from(doc.body.childNodes).forEach(node => processNode(node));

    return doc.body.innerHTML;
}

// Function to discover links and emails
const discoverLinksAndEmails = (text) => {
    const urlRegex = /\bhttps?:\/\/[^\s<]+/gi; // Detect URLs
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g; // Detect emails

    let matches = [];

    // Find URLs
    text.replace(urlRegex, (match, offset) => {
        matches.push({ type: "url", value: match, index: offset, length: match.length });
    });

    // Find Emails
    text.replace(emailRegex, (match, offset) => {
        matches.push({ type: "email", value: match, index: offset, length: match.length });
    });

    return matches.sort((a, b) => a.index - b.index); // Sort matches by position
}

export function formatNumber(value) {
    if (value === '') return '';
    return new Intl.NumberFormat().format(value);
}

export const validateDescriptionField = (description, errorDescription) => {
    if (!description || description.trim() === "") {
        errorDescription = true;
        return false;
    } else {
        errorDescription = false;
        return true;
    }
};
  