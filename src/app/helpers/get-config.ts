
export function getConfig(): MovieConfig {
    const _window: any = window;
    const riskaConfigFromWindow = _window && _window.MOVIEINFO_CONFIG || {serviceURL: 'http://localhost:8080/'};
    
    return riskaConfigFromWindow;
}

export class MovieConfig {
    serviceURL: string
}