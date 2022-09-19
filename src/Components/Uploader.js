import React from "react";
import FileUploader from "devextreme-react/file-uploader";
import {URL_BASE, URL_UPLOADS} from "../Services/Axios/ApiUrls";

const DEFAULT_EXTENSIONS = ['.jpg', '.jpeg', '.gif', '.png']

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDropZoneActive: false,
            imageSource: '',
            textVisible: true,
            progressVisible: false,
            progressValue: 0,
        };

        this.allowedFileExtensions = this.props.extensions ?? DEFAULT_EXTENSIONS;
    }

    render () {
        return (
            <FileUploader
                id="file-uploader"
                dialogTrigger="#dropzone-external"
                dropZone="#dropzone-external"
                multiple={false}
                allowedFileExtensions={this.allowedFileExtensions}
                uploadMode="instantly"
                uploadUrl={URL_BASE + URL_UPLOADS}
                visible={false}
                onDropZoneEnter={this.onDropZoneEnter}
                onDropZoneLeave={this.onDropZoneLeave}
                onUploaded={this.onUploaded}
                onProgress={this.onProgress}
                onUploadStarted={this.onUploadStarted}
            ></FileUploader>
        );
    }

}

export default App;