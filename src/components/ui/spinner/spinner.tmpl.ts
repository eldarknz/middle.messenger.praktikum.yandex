// language=hbs

export default `
    <svg
        class="{{className}}"
        style="{{style}}"
        viewBox="0 0 {{size}} {{size}}"
    >
        <circle
            class="spinner-rear"
            cx="{{cx}}"
            cy="{{cy}}"
            r="{{radius}}"
            fill="none"
            stroke-width="{{strokeWidth}}"
        ></circle>
        <circle
            class="spinner-front"
            cx="{{cx}}"
            cy="{{cy}}"
            r="{{radius}}"
            fill="none"
            stroke-width="{{strokeWidth}}"
        ></circle>
    </svg>
`
