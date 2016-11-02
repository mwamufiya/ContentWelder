import {Injectable} from "@angular/core";

@Injectable()
export class MediaChooserService{
    getImageSources():Array<{name:string, value:string, icon:string}>{
        return [
            {
                name: 'Pixabay',
                value: 'pixabay',
                icon: 'https://pixabay.com/apple-touch-icon-144x144.png'
            },
            {
                name: 'google',
                value: 'google',
                icon: 'http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Google-Search-icon.png'
            },
            {
                name: 'Image Library',
                value: 'internal',
                icon: 'images/instagram.png'
            },
            {
                name: 'instagram',
                value: 'ig',
                icon: 'images/instagram.png'
            },
            {
                name: 'facebook',
                value: 'fb',
                icon: 'images/facebook.png'
            }
        ];
    }

    getVideoSources():Array<{name:string, value:string, icon:string}>{
        return [
            {
                name: 'Pixabay',
                value: 'pixabay',
                icon: 'https://pixabay.com/apple-touch-icon-144x144.png'
            },
            {
                name: 'google',
                value: 'google',
                icon: 'http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Google-Search-icon.png'
            }
        ];
    }
}