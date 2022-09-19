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

        this.onDropZoneEnter = this.onDropZoneEnter.bind(this);
        this.onDropZoneLeave = this.onDropZoneLeave.bind(this);
        this.onUploaded = this.onUploaded.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onUploadStarted = this.onUploadStarted.bind(this);
        // this.sendToBack = this.sendToBack.bind(this);
    }

    onDropZoneEnter(e) {
        if (e.dropZoneElement.id === 'dropzone-external') {
            this.setState({ isDropZoneActive: true });
        }
    }

    onDropZoneLeave(e) {
        if (e.dropZoneElement.id === 'dropzone-external') {
            this.setState({ isDropZoneActive: false });
        }
    }

    onUploaded(e) {
        const { file } = e;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            this.setState({
                isDropZoneActive: false,
                imageSource: fileReader.result,
            });
        };
        fileReader.readAsDataURL(file);
        // this.sendToBack(file);
        this.setState({
            textVisible: false,
            progressVisible: false,
            progressValue: 0,
        });
    }

    onProgress(e) {
        this.setState({ progressValue: (e.bytesLoaded / e.bytesTotal) * 100 });
    }

    onUploadStarted() {
        this.setState({
            imageSource: '',
            progressVisible: true,
        });
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
                // uploadUrl={URL_BASE + URL_UPLOADS}
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