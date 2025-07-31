
export function createGoogleTabSpan(labelText) {
    const span = document.createElement('span');
    span.innerText = labelText;
    Object.assign(span.style, {
        borderBottomColor: 'transparent',
        color: '#80868b',
        fontWeight: '500',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        width: 'fit-content',
        fontFamily: 'Google Sans, Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '20px',
        borderBottom: '3px solid transparent',
        paddingBottom: '8px'
    });
    return span;
}

export function createGoogleTabDiv() {
    const div = document.createElement('div');
    Object.assign(div.style, {
        display: "flex",
        minHeight: "48px",
        padding: "0 12px",
        columnGap: "2px",
        alignItems: "end"
    });
    return div;
}
