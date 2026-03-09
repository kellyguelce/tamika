import { pocketbase } from "./pocketbase";

interface Record {
    [key: string]: any
}

export function pbFileUrl(
    record: Record,
    filename: string,
    _thumb: string = '100x100',
    download: boolean = false
) {
    let _fileurl = pocketbase.files.getURL(record, filename, { 'thumb': _thumb })
    if (download) _fileurl = _fileurl + '&download=1'
    return _fileurl
}