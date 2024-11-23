import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import Home from './Home';
import Excel from './Excel';
import { homeOutline, logOutOutline, newspaperOutline } from 'ionicons/icons';

const Menu: React.FC = () => {
  const paths = [
    {name: "Home", url: "/app/home", icon: homeOutline},
    {name: "Excel", url: "/app/excel", icon: newspaperOutline},
  ]
  return (
    <IonPage>
      <IonSplitPane contentId='main'>
        <IonMenu contentId='main'>
          <IonHeader>
            <IonToolbar color={'secondary'}>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem detail={false} routerDirection='none' routerLink={item.url}>
                  <IonIcon slot='start' icon={item.icon} />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}
            <IonMenuToggle autoHide={false}>
              <IonButton expand='full' routerLink='/' routerDirection='root'>
                <IonIcon slot='start' icon={ logOutOutline } />
                Logout
              </IonButton>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id='main'>
          <Route exact path="/app/home" component={Home} />
          <Route path="/app/excel" component={Excel} />
          <Route exact path="/app">
            <Redirect to="/app/home" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;