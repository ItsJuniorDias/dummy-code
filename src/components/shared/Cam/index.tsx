import React, { useCallback, useRef, useState } from 'react';
import {
  FiCamera,
  FiCameraOff,
  FiRepeat,
  FiSave,
  FiTrash2,
} from 'react-icons/fi';
import Cam from 'react-webcam';
import { Button } from '../../index';
import {
  Container,
  CamContainer,
  ButtonsContainer,
  PreviewContainer,
  ActionButtons,
} from './styles';

export type ImageBase64 = string | null | undefined;

interface CamProps {
  onCapture?: (image: ImageBase64) => void;
  onSaveAction: (image: ImageBase64) => void;
  aspectRatio?: number;
}

const CamComponent = ({
  onCapture,
  onSaveAction,
  aspectRatio = 9 / 16,
}: CamProps) => {
  const camRef = useRef<Cam>(null);
  const [camIsOpen, setCamIsOpen] = useState(true);
  const [preview, setPreview] = useState<ImageBase64>(null);
  const [facingMode, setFacingMode] = useState<
    { exact: 'user' | 'environment' } | undefined
  >(undefined);

  const capture = useCallback(() => {
    const image = camRef.current?.getScreenshot();

    if (onCapture) onCapture(image);

    setPreview(image);
  }, [onCapture]);

  const deletePhoto = useCallback(() => {
    if (onCapture) onCapture(null);

    setPreview(null);
  }, [onCapture]);

  const handleSaveAction = useCallback(() => {
    onSaveAction(preview);

    setPreview(null);
  }, [onSaveAction, preview]);

  const switchCamera = useCallback(() => {
    setFacingMode(prevState =>
      prevState ? undefined : { exact: 'environment' },
    );
  }, []);

  return (
    <Container aspectRatio={aspectRatio} $camIsOpen={camIsOpen}>
      <CamContainer>
        <Cam
          ref={camRef}
          audio={false}
          videoConstraints={{
            facingMode,
          }}
          screenshotFormat="image/webp"
          style={{
            transform: `rotateY(${facingMode ? '180deg' : '0'})`,
            display: camIsOpen ? 'initial' : 'none',
          }}
        />

        {!!preview && (
          <>
            <ActionButtons>
              <Button variant="red" onClick={deletePhoto}>
                <FiTrash2 />
              </Button>

              <Button variant="green" onClick={handleSaveAction}>
                <FiSave />
              </Button>
            </ActionButtons>

            <PreviewContainer>
              <img
                src={preview}
                className="screen-preview"
                alt=""
                style={{
                  transform: `rotateY(${facingMode ? '180deg' : '0'})`,
                }}
              />
            </PreviewContainer>
          </>
        )}
      </CamContainer>

      <ButtonsContainer>
        <Button
          onClick={() => setCamIsOpen(prevState => !prevState)}
          variant={camIsOpen ? 'red' : 'green'}
        >
          {camIsOpen ? (
            <>
              <FiCameraOff /> Fechar
            </>
          ) : (
            <>
              <FiCamera /> Abrir camera
            </>
          )}
        </Button>

        <Button onClick={switchCamera} variant="yellow">
          <FiRepeat /> {facingMode ? 'Camera traseira' : 'Camera frontal'}
        </Button>

        {camIsOpen && (
          <Button onClick={capture} variant="red">
            <FiCamera />
          </Button>
        )}
      </ButtonsContainer>
    </Container>
  );
};

export default CamComponent;
