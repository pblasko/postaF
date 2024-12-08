import React, { useEffect, useRef, useState } from 'react';
import {
  IonButton, IonButtons, IonCard, IonCardContent,
  IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader,
  IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonModal,
  IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToast,
  IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import { addOutline, mailOpenOutline } from 'ionicons/icons';
import './Home.css';
import DoughnutChart from '../components/Graph'; // Grafikon komponens
import { fetchData, postData } from '../utils/api'; // Általános API függvények
import { VehicleData, Case, NewCase } from '../components/Types'; // Típusok definiálása
import SummaryCard from '../components/SummaryCard';

const Home: React.FC = () => {
  const cardModal = useRef<HTMLIonModalElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);

  // Állapotok
  const [loading, setLoading] = useState<boolean>(true);
  const [vehiclesData, setVehiclesData] = useState<VehicleData | null>(null);
  const [chartData, setChartData] = useState<number[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const [inFamiliar, setInFamiliar] = useState<any>();
  const [changeInFamiliar, setChangeInFamiliar] = useState<any>();
  const [inPackage, setInPackage] = useState<any>();
  const [changeInPackage, setChangeInPackage] = useState<any>();
  const [inNetwork, setInNetwork] = useState<any>();
  const [changeInNetwork, setChangeInNetwork] = useState<any>();
  const [inParking, setInParking] = useState<any>();
  const [changeInParking, setChangeInParking] = useState<any>();

  const categories = [
    { id: 1, name: "Megjavított autó" },
    { id: 2, name: "Elromlott autó" }
  ];

  const [formData, setFormData] = useState<NewCase>({
    id: null,
    category: undefined,
    licensePlate: '',
    type: '',
    description: '',
    solution: ''
  });

  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  // Adatok betöltése
  useIonViewWillEnter(() => {
    loadAllData();
  });

  const loadAllData = async () => {
    setLoading(true);
    try {
      const data = await fetchData('http://192.168.1.239:8000/');
      setVehiclesData(data.actualReport);
      setCases(data.cases);
      setChartData([
        data.actualReport.inService,
        data.actualReport.allVehicles - data.actualReport.inService
      ]);
      setInFamiliar(data.actualReport.inFamiliar);
      setChangeInFamiliar(data.actualReport.inFamiliar - data.basicReport.inFamiliar);
      setInPackage(data.actualReport.inPackage);
      setChangeInPackage(data.actualReport.inPackage - data.basicReport.inPackage);
      setInNetwork(data.actualReport.inNetwork);
      setChangeInNetwork(data.actualReport.inNetwork - data.basicReport.inNetwork);
      setInParking(data.actualReport.inParking);
      setChangeInParking(data.actualReport.inParking - data.basicReport.inParking);
    } catch (error) {
      console.error("Error loading data:", error);
      setToastMessage('Hiba történt az adatok betöltése során.');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (endpoint: string) => {
    setLoading(true);
    try {
      await postData(`http://192.168.1.239:8000/${endpoint}`, formData);
      setToastMessage('Sikeres művelet!');
      setShowToast(true);
      closeModal();
      loadAllData();
    } catch (error) {
      console.error(`Error in ${endpoint}:`, error);
      setToastMessage('Hiba történt a művelet során!');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // Bezárja a modalokat
  const closeModal = () => {
    cardModal.current?.dismiss();
    modal.current?.dismiss();
    setSelectedCase(null);
    resetForm();
  };

  // Törli a case adatait
  const resetForm = () => {
    setFormData({
      id: null,
      category: undefined,
      licensePlate: '',
      type: '',
      description: '',
      solution: ''
    });
  };

  // E-mail küldése
  const sendEmail = async () => {
    try {
      const response = await fetchData('http://192.168.1.239:8000/send');
      setToastMessage(response.message || 'Email sikeresen elküldve!');
    } catch {
      setToastMessage('Hiba történt az email küldése során!');
    } finally {
      setShowToast(true);
    }
  };

  // Amikor a modal megnyílik, az aktuális esetet tölti be
  React.useEffect(() => {
    if (selectedCase) {
      setFormData({
        ...selectedCase,
        solution: selectedCase.solution || '', // Átalakítás üres stringgé, ha undefined
      });
    }
  }, [selectedCase]);

  // Frissítés form mezők változására
  const handleInputChange = (key: keyof NewCase, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Székesfehérvár</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {/* Flotta összegzés */}
          <IonRow>
            <IonCol size="12">
              <SummaryCard title="A depó teljes gépjármű flottája" value={vehiclesData?.allVehicles} color="#168a4a" />
            </IonCol>
          </IonRow>
          {/* Részletek és diagram */}
          <IonRow>
            <IonCol size="8">
              <SummaryCard title="Szervízben" value={vehiclesData?.inService} change={vehiclesData?.inServiceChange} color="#ffc409" />
            </IonCol>
            <IonCol size="4">
              <IonCard>
                <IonCardContent>
                  <DoughnutChart chartdata={chartData} />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          {/* Egyéb adatok */}
          {/* Például további kategóriák */}
          <IonRow>
            <IonCol size="3" style={{ padding: '0' }}>
              <SummaryCard title="Járatos" value={inFamiliar} change={changeInFamiliar} color="#168a4a" />
            </IonCol>
            <IonCol size="3" style={{ padding: '0' }}>
              <SummaryCard title="Csomagos" value={inPackage} change={changeInPackage} color="#168a4a" />
            </IonCol>
            <IonCol size="3" style={{ padding: '0' }}>
              <SummaryCard title="Hálózatos" value={inNetwork} change={changeInNetwork} color="#168a4a" />
            </IonCol>
            <IonCol size="3" style={{ padding: '0' }}>
              <SummaryCard title="Parkoló" value={inParking} change={changeInParking} color="#168a4a" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" style={{ padding: "0px" }}>
              {cases.map((oneOfCase, index) => (
                <IonRow
                  key={index}
                  style={{
                    width: "100%",
                    backgroundColor: Number(oneOfCase.category) === 1
                    ? "#168a4a"
                    : Number(oneOfCase.category) === 2
                    ? "#ffc409"
                    : "white",
                    color: Number(oneOfCase.category) === 1
                        ? "white"
                        : Number(oneOfCase.category) === 2
                        ? "black"
                        : "white",
                    margin: "10px 0px",
                    padding: "10px"
                  }}
                  onClick={() => setSelectedCase(oneOfCase)}
                >
                  <IonCol size="3" style={{ display: "flex", alignItems: "center" }}>
                    <IonText>{oneOfCase.licensePlate}</IonText>
                  </IonCol>
                  <IonCol size="3" style={{ display: "flex", alignItems: "center" }}>
                    <IonText>{oneOfCase.type}</IonText>
                  </IonCol>
                  <IonCol size="6">
                    <IonText>
                      <h6 style={{ margin: "0 0 5px 0" }}>{oneOfCase.description}</h6>
                      <p style={{ margin: "0" }}>{oneOfCase.solution}</p>
                    </IonText>
                  </IonCol>
                </IonRow>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* Card modal */}
        <IonModal ref={cardModal} trigger="card-modal" onDidDismiss={resetForm}>
          <IonHeader>
            <IonToolbar color="success">
              <IonButtons slot="start">
                <IonButton onClick={closeModal}>Close</IonButton>
              </IonButtons>
              <IonTitle>Add new case</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem className="ion-padding-bottom">
              <IonSelect
                className="custom-select"
                value={formData.category} // Az állapot itt a formData.category lesz
                onIonChange={(e) => {
                  const selectedValue = e.detail.value!;
                  setFormData((prevData) => ({
                    ...prevData,
                    category: selectedValue, // Frissítsd a formData.category mezőt
                  }));
                }}
                color="success"
                labelPlacement="stacked"
                label="Enter category"
                placeholder="Category"
              >
                {categories.map((category) => (
                  <IonSelectOption key={category.id} value={category.id}>
                    {category.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className="ion-padding-bottom">
              <IonInput
                color="success"
                value={formData.licensePlate}
                onIonChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    licensePlate: e.detail.value || '',
                  }))
                }
                labelPlacement="stacked"
                label="Enter license plate"
                placeholder="License plate number"
              />
            </IonItem>
            <IonItem className="ion-padding-bottom">
              <IonInput
                color="success"
                value={formData.type}
                onIonChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    type: e.detail.value || '',
                  }))
                }
                labelPlacement="stacked"
                label="Enter type of car"
                placeholder="Type of car"
              />
            </IonItem>
            <IonItem className="ion-padding-bottom">
              <IonInput
                color="success"
                value={formData.description}
                onIonChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    description: e.detail.value || '',
                  }))
                }
                labelPlacement="stacked"
                label="Enter description"
                placeholder="Description"
              />
            </IonItem>
            <IonItem className="ion-padding-bottom">
              <IonInput
                color="success"
                value={formData.solution}
                onIonChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    solution: e.detail.value || '',
                  }))
                }
                labelPlacement="stacked"
                label="Enter solution"
                placeholder="Solution"
              />
            </IonItem>
            <IonButton expand="block" color="primary" onClick={() => handleFormSubmit('newCase')}>
              Save
            </IonButton>
          </IonContent>
        </IonModal>
        {/* Modal */}
        <IonModal
          isOpen={Boolean(selectedCase)}
          onIonModalDidDismiss={() => setSelectedCase(null)}
        >
          <IonHeader>
            <IonToolbar color="success">
              <IonButtons slot="start">
                <IonButton onClick={() => closeModal()}>Close</IonButton>
              </IonButtons>
              <IonTitle>{formData.id ? 'Edit Case' : 'New Case'}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem className="ion-padding-bottom">
              <IonSelect
                className="custom-select"
                value={formData.category}
                onIonChange={(e) => handleInputChange('category', e.detail.value)}
                color="success"
                labelPlacement="stacked"
                label="Enter category"
                placeholder="Category"
              >
                {categories.map((category) => (
                  <IonSelectOption key={category.id} value={category.id}>
                    {category.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className="ion-padding-bottom">
              <IonInput
                color="success"
                value={formData.licensePlate}
                onIonChange={(e) => handleInputChange('licensePlate', e.detail.value)}
                labelPlacement="stacked"
                label="Enter license plate"
                placeholder="License plate number"
              />
            </IonItem>
            <IonItem className="ion-padding-bottom">
              <IonInput
                color="success"
                value={formData.type}
                onIonChange={(e) => handleInputChange('type', e.detail.value)}
                labelPlacement="stacked"
                label="Enter type of car"
                placeholder="Type of car"
              />
            </IonItem>
            <IonItem className="ion-padding-bottom">
              <IonInput
                color="success"
                value={formData.description}
                onIonChange={(e) => handleInputChange('description', e.detail.value)}
                labelPlacement="stacked"
                label="Enter description"
                placeholder="Description"
              />
            </IonItem>
            <IonItem className="ion-padding-bottom">
              <IonInput
                color="success"
                value={formData.solution}
                onIonChange={(e) => handleInputChange('solution', e.detail.value)}
                labelPlacement="stacked"
                label="Enter solution"
                placeholder="Solution"
              />
            </IonItem>
            <IonButton
              className="ion-padding-bottom"
              expand="block"
              color="secondary"
              onClick={() => handleFormSubmit('settingCase')}
            >
              Setting
            </IonButton>
            {formData.id && (
              <IonButton expand="block" color="danger" onClick={() => handleFormSubmit('deleteCase')}>
                Delete
              </IonButton>
            )}
          </IonContent>
        </IonModal>
        {/* Email gomb */}
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton onClick={sendEmail} color={'secondary'}>
            <IonIcon icon={mailOpenOutline} />
          </IonFabButton>
        </IonFab>
        {/* Új eset gomb */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id='card-modal' color={'secondary'}> 
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
        {/* Toast */}
        <IonToast isOpen={showToast} message={toastMessage} duration={2000} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Home;