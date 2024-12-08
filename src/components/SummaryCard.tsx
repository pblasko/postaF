import { IonCard, IonCardContent } from '@ionic/react';
import React from 'react';

const SummaryCard: React.FC<{ title: string; value?: number; change?: number; color: string }> = ({ title, value, change, color }) => (
    <IonCard style={{ backgroundColor: color, height: '25vh' }}>
      <IonCardContent style={{ textAlign: 'center', color: 'white', fontSize: '20px' }}>
        <div>{title}</div>
        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{value || '-'}</div>
        {change !== undefined && <div style={{ fontSize: '16px' }}>( {change} )</div>}
      </IonCardContent>
    </IonCard>
  );
  
export default SummaryCard;