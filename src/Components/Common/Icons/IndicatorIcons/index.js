export function WarningIcon(props) {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="24"
            width="24"
            {...props}
        >
            <path fill="green" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
        </svg>
    );
}

export function ReportIcon(props) {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="24"
            width="24"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
            />
            <path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z" />
        </svg>
    );
}

export function InfoIcon(props) {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="24"
            width="24"
            {...props}
        >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
            <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
        </svg>
    );
}

export function VerifiedUserIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="24"
            width="24"
            {...props}
        >
            <path d="M16.53 9.78a.75.75 0 00-1.06-1.06L11 13.19l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5-5z" />
            <path
                fillRule="evenodd"
                d="M12.54.637a1.75 1.75 0 00-1.08 0L3.21 3.312A1.75 1.75 0 002 4.976V10c0 6.19 3.77 10.705 9.401 12.83.386.145.812.145 1.198 0C18.229 20.704 22 16.19 22 10V4.976c0-.759-.49-1.43-1.21-1.664L12.54.637zm-.617 1.426a.25.25 0 01.154 0l8.25 2.676a.25.25 0 01.173.237V10c0 5.461-3.28 9.483-8.43 11.426a.2.2 0 01-.14 0C6.78 19.483 3.5 15.46 3.5 10V4.976c0-.108.069-.203.173-.237l8.25-2.676z"
            />
        </svg>
    );
}

export function FocusIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="24"
            width="24"
            {...props}
        >
            <path d="M12 9a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3m7 10h-4v2h4a2 2 0 002-2v-4h-2m0-12h-4v2h4v4h2V5a2 2 0 00-2-2M5 5h4V3H5a2 2 0 00-2 2v4h2m0 6H3v4a2 2 0 002 2h4v-2H5v-4z" />
        </svg>
    );
}

export function CheckBoxIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="24"
            width="24"
            {...props}
        >
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m0 2v14H5V5h14m-9 12l-4-4 1.41-1.42L10 14.17l6.59-6.59L18 9" />
        </svg>
    );
}

export function CheckBoxBlankIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="24"
            width="24"
            {...props}
        >
            <path d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m0 2v14H5V5h14z" />
        </svg>
    );
}

export function RadioCheckedIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" {...props}>
            <path fill="currentColor" d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function RadioCheckIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function GradeIcon(props) {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="24"
            width="24"
            {...props}
        >
            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />
        </svg>
    );
}

export function SupplierIcon(props) {
    return (
        <svg fill="none" viewBox="0 0 15 15" height="24" width="24" {...props}>
            <path
                fill="currentColor"
                d="M7.5 9.804l.242-.437a.5.5 0 00-.484 0l.242.437zM5.337 11l-.494-.08a.5.5 0 00.736.518L5.337 11zm.413-2.533l.493.08a.5.5 0 00-.135-.429l-.358.35zM4 6.674l-.075-.495a.5.5 0 00-.283.844L4 6.673zm2.418-.37l.076.495a.5.5 0 00.377-.282l-.453-.213zM7.5 4l.453-.212a.5.5 0 00-.906 0L7.5 4zm1.082 2.304l-.453.213a.5.5 0 00.377.282l.076-.495zm2.418.37l.358.349a.5.5 0 00-.283-.844L11 6.674zM9.25 8.467l-.358-.349a.5.5 0 00-.135.43l.493-.08zM9.663 11l-.242.438a.5.5 0 00.736-.519L9.663 11zM7.258 9.367l-2.163 1.195.484.876 2.163-1.196-.484-.875zM5.83 11.08l.413-2.532-.986-.161-.414 2.532.987.162zm.278-2.962l-1.75-1.794-.716.699 1.75 1.793.716-.698zm-2.033-.95l2.419-.37-.151-.988-2.418.37.15.988zm2.796-.651l1.082-2.305-.906-.424-1.081 2.304.905.425zm.176-2.305L8.13 6.517l.905-.425-1.081-2.304-.906.424zM8.507 6.8l2.418.369.15-.989-2.418-.369-.15.989zm2.135-.475l-1.75 1.794.716.698 1.75-1.793-.716-.699zM8.757 8.548l.413 2.533.987-.162-.414-2.532-.986.16zm1.148 2.014L7.742 9.367l-.484.875 2.163 1.196.484-.876zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zM14 7.5A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0z"
            />
        </svg>
    );
}