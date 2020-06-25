import * as React from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';

import { RECORD_STATUS } from '../types';
import MicRecorder from 'mic-recorder-to-mp3';

export interface RecordAudioProps {}

export interface RecordAudioState {
    recordStatus: RECORD_STATUS;
    recordedAudioURL: string;
}

export class RecordAudio extends React.Component<
    RecordAudioProps,
    RecordAudioState
> {
    private mediaRecorder: any;
    private MicRecorder = new MicRecorder({ bitRate: 128 });

    constructor(props: RecordAudioProps) {
        super(props);
        this.state = {
            recordStatus: RECORD_STATUS.DONE,
            recordedAudioURL: '',
        };
    }

    public render() {
        const { recordStatus, recordedAudioURL } = this.state;
        return (
            <React.Fragment>
                <Form>
                    <Form.Group>
                        <Form.Field label="or Record an audio in browser" />
                        <Button.Group>
                            <Button
                                color="green"
                                icon="circle"
                                content="Record"
                                disabled={recordStatus !== RECORD_STATUS.DONE}
                                onClick={this.startRecording}
                            />
                            <Button
                                color="red"
                                icon="square"
                                content="Stop"
                                disabled={recordStatus === RECORD_STATUS.DONE}
                                onClick={this.stopRecording}
                            />
                        </Button.Group>
                    </Form.Group>
                </Form>
                {recordedAudioURL && (
                    <Segment>
                        <audio controls>
                            <source src={recordedAudioURL} type="audio/mpeg" />
                        </audio>
                    </Segment>
                )}
            </React.Fragment>
        );
    }

    private startRecording = () => {
        this.MicRecorder
            .start()
            .then(() => {
                this.setState({
                    recordStatus: RECORD_STATUS.RECORDING,
                });
            }).catch((e) => console.error(e));
        };

      private stopRecording = () => {
        this.MicRecorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const audioUrl = URL.createObjectURL(blob);
            this.setState({
                recordedAudioURL: audioUrl,
            });
          }).catch((e) => console.log(e));
      };
}
