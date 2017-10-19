import { MAIN } from '../../endpoints';

export class URL_PARAMS {
    private static URL_POSTFIX = 'v1/public/';

    public static get MAIN() {
        return `${MAIN[ENV]}${URL_PARAMS.URL_POSTFIX}`;
    }
}
