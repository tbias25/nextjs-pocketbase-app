import { Button, Modal } from "flowbite-react";
import SignaturePad from "react-signature-pad-wrapper";
import React, { useState } from "react";

type Props = {
    showModal: boolean
    documentId?: string,
    documentName?: string,
  };

export default function SignaturePadModal({ showModal, documentId, documentName } : Props) {

    let padRef = React.useRef<SignaturePad>(null);

    const [visible, setVisible] = useState(showModal);

    function handleClose() {
      setVisible(!visible)
    }

    function handleClear() {
      const signaturePad = padRef.current;
      if (!signaturePad) {
        return;
      }
      signaturePad.instance.clear();
    }

    function handleSave() {
      const signaturePad = padRef.current;
      if (!signaturePad) {
        return;
      }
      if (signaturePad.isEmpty()) {
        console.log("pad empty")
      } else {
        console.log("toData: ", signaturePad.toData());
        console.log("toDataURL: ", signaturePad.toDataURL());
        console.log("toSVG: ", signaturePad.toSVG());
      }
    }
    
    return (
        <>
        <Modal
                    show={visible}
                    size="md"
                    popup={false}
                    onClose={handleClose}
                  >
                    <Modal.Header>{documentName}</Modal.Header>
                    <Modal.Body>
                      <div className="flex flex-col gap-4">
                        <div className="bg-gray-100 rounded-lg border-2 border-gray-300">
                          <SignaturePad ref={padRef} />
                        </div>

                        <div className="flex flex-row justify-between">
                          <Button color="light" outline={true} onClick={handleClear}>
                            Leeren
                          </Button>
                          <Button color="light" outline={true} onClick={handleSave}>
                            Fertig
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal></>
    )
}
