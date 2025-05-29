import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText
} from '@ionic/react';

import AttendanceTracker from '../../components/AttendanceTracker'; // Adjust the relative path if needed

const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{ color: '#fff', fontWeight: 'bold' }}>IAS APPLICATION DEVELOPMENT</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen color="light">
        <div style={{ padding: '16px' }}>
          <IonCard className="ion-activatable ripple-parent" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)', transition: 'transform 0.3s ease' }}>
            <IonCardHeader>
              <IonCardTitle style={{ color: '#fff', fontWeight: 'bold', fontSize: '22px' }}>
                Welcome! Please check your attendance.
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText style={{ color: '#fff' }} color="medium">
                Here's where you’ll see your latest updates.
              </IonText>
            </IonCardContent>
          </IonCard>

          {/* Insert the AttendanceTracker component here */}
          <AttendanceTracker />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
