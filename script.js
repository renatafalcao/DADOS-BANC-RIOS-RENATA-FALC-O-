document.addEventListener('DOMContentLoaded', () => {
    function copyTextToClipboard(textToCopy) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => alert('Copiado para a área de transferência!'))
                .catch(() => fallbackCopyTextToClipboard(textToCopy));
        } else {
            fallbackCopyTextToClipboard(textToCopy);
        }
    }
    function fallbackCopyTextToClipboard(textToCopy) {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            document.execCommand('copy');
            alert('Copiado para a área de transferência!');
        } catch {
            alert('Não foi possível copiar automaticamente.');
        } finally {
            document.body.removeChild(textarea);
        }
    }
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const inputElement = document.getElementById(targetId);
            if (inputElement) copyTextToClipboard(inputElement.value);
        });
    });
    document.querySelectorAll('.copy-block-btn').forEach(button => {
        button.addEventListener('click', () => {
            let blockText = button.dataset.block;
            blockText = decodeURIComponent(blockText.replace(/%0A/g, '\n'));
            copyTextToClipboard(blockText);
        });
    });
    document.querySelectorAll('.copy-field input[type="text"]').forEach(input => {
        input.addEventListener('click', function() {
            this.select();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(this.value).catch(() => {});
            }
        });
    });
});