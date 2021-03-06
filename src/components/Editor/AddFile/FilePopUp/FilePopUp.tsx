import * as React from 'react';
import './FilePopUp.scss';
import { observer } from 'mobx-react';
import DropZone from '../DropZone/DropZone'

import { homeEditorStore } from '../../../../store/HomeEditorStore';
const FilePopUp = observer(() => {
    return (
        <section className='modalFileAdd modal'
            style={{
                display: homeEditorStore.filePopUpAdd === true ? "flex" : "none"
            }}
        >
            <article className="popUp">
                <article className="exit" onClick={() => {
                    homeEditorStore.filePopUpAddStatus();
                    homeEditorStore.clearTags();
                    const myForm: HTMLFormElement = document.querySelector("#createFileForm");
                    myForm.reset();
                    homeEditorStore.accepted = [];
                    homeEditorStore.rejected = [];
                }}><div></div><div></div></article>
                <h1>Importar Base de Datos</h1>
                <DropZone />
                <form id="createFileForm" onSubmit={(e: any) => {
                    e.preventDefault();
                    if (typeof homeEditorStore.accepted[0] != "undefined") {
                        homeEditorStore.newFile.tagnames = homeEditorStore.tags;
                        homeEditorStore.uploadNewFile(homeEditorStore.accepted[0]);
                        homeEditorStore.addNewFile();
                        homeEditorStore.clearFile();
                        homeEditorStore.clearTags();
                        homeEditorStore.filePopUpAddStatus();
                        homeEditorStore.accepted = [];
                        const myForm: HTMLFormElement = document.querySelector("#createFolderForm");
                        myForm.reset();
                    } else {
                        alert("It must be a valid file type (.csv)")
                    }
                }}>
                    <ul>
                        <li>
                            <label>Archivo</label>
                            <input type="text" name="archivo" placeholder="Archivo.csv" value={
                                (typeof homeEditorStore.accepted[0] != 'undefined') ? homeEditorStore.accepted[0].name : ""} disabled />
                            <button disabled >Subir Archivo</button>
                        </li>
                        <li>
                            <label>Nombre</label>
                            <input type="text" name="nombre" placeholder="Nombre" onChange={(e: any) => {
                                homeEditorStore.newFile.name = e.target.value;
                            }} />
                        </li>
                        <li>
                            <label>Referencia</label>
                            <input type="link" name="link" placeholder="Link de Referencia" onChange={(e: any) => {
                                homeEditorStore.newFile.link = e.target.value;
                            }} />
                        </li>
                        <li>
                            <label>Descipción</label>
                            <input type="text" name="descipcion" placeholder="Descripción de la base de datos" onChange={(e: any) => {
                                homeEditorStore.newFile.description = e.target.value;
                            }} />
                        </li>
                        <li className="tags">
                            <label>Etiquetas</label>
                            <ul>
                                {homeEditorStore.tags.map((elem: any, index: number) =>
                                    <li key={elem} style={{
                                        display: elem.length >= 1 ? "flex" : "none"
                                    }}>
                                        <span>{elem}</span>
                                        <p onClick={() => {
                                            homeEditorStore.eliminateTag(elem);
                                            console.log(elem);
                                        }}>×</p>
                                    </li>
                                )}

                            </ul>
                            <input type="text" name="etiquetas" placeholder="Etiquetas"
                                onChange={(e: any) => {
                                    homeEditorStore.addTags(e.target.value + " ");
                                }}
                                onEmptied={() => {
                                    homeEditorStore.clearTags();
                                }}
                            />
                            <label className="tagAmount"><b>{3 - homeEditorStore.tags.length}</b>/3</label>

                        </li>
                        <button
                            onClick={() => {
                                // ----- TESTING ------
                                homeEditorStore.confirmUpload("Archivo", homeEditorStore.newFile.name);
                                function upload() {
                                    homeEditorStore.setToFalse()
                                }
                                setTimeout(upload, 12000);
                                // ----- TESTING ------
                            }} type="submit">IMPORTAR</button>
                    </ul>
                </form>

            </article>
        </section>
    )
});
export default FilePopUp;
