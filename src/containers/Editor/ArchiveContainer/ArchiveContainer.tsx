import * as React from 'react';


import '../../../../public/css/flex.scss'
import './ArchiveContainer.scss';

import Dash from '../../../components/Editor/Dash/Dash';
import Header from '../../../components/Common/Header/Header';
import { firebaseStore } from '../../../store/FsActionStore';
import { folderInStore } from '../../../store/FolderInStore';
import { observer } from 'mobx-react';
import { ArchiveView } from '../../../components/Editor/ArchiveView/ArchiveView';
import SortButton from '../../../components/Editor/SortButton/SortButton';
import { homeEditorStore } from '../../../store/HomeEditorStore';

import DeleteButton from '../../../components/Editor/DeleteButton/DeleteButton';

let folderID: any = '';

@observer export class ArchiveContainer extends React.Component {
    constructor(props: any) {
        super(props);

        folderID = this.getFolderId();

        this.updateFolder(folderID);
    }

    getFolderId() {
        let locationWindow = window.location.pathname;
        let locationArray = locationWindow.split('/');
        return locationArray.slice(-1)[0];
    }

    updateFolder(folderID: string) {
        folderInStore.folderIdArchives = folderID;
        folderInStore.updateArchives();
        folderInStore.updateParentName();
    }

    componentDidUpdate() {
        if (folderID != this.getFolderId()) {

            folderID = this.getFolderId();

            this.updateFolder(folderID);
        }
    }

    render() {

        return <div className="contHome row-flex">
            <Dash />

            <div className="app flex-child col-flex">
                <Header user={firebaseStore.userInfo.email} />
                <SortButton state={homeEditorStore.sortButState} />
                <DeleteButton />
                <section className="scroll">
                    <ArchiveView archives={folderInStore.folderInArchives} folderName={folderInStore.folderParentName} />
                </section>
            </div>

        </div>
    }
}