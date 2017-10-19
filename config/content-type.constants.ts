export class CONTENT_TYPE {
    public static get JSON(): string {
        return 'application/json';
    }

    public static get JSON_TYPE(): string {
        return 'JSON';
    }

    public static get TEXT(): string {
        return 'text/plain;charset=UTF-8';
    }

    public static get TEXT_TYPE(): string {
        return 'TEXT';
    }

    public static get FORM(): string {
        return 'application/x-www-form-urlencoded';
    }

    public static get FORM_TYPE(): string {
        return 'FORM';
    }
}
