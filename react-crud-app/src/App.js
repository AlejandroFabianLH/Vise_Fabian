import React, { Component } from 'react';
import './App.css';
import { ProductStore } from './store/ProductStore';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
    constructor(){
        super();
        this.state = {
            visible: false,
            product: {
                id: null,
                name: null,
                brand: null,
                madein: null,
                price: null
            },
            selectedProduct: {

            }
        };
        this.items = [
            {
                label: 'Nuevo',
                icon: 'pi pi-fw pi-plus',
                commnad: () => {this.showCreate()}
            },
            {
                label: 'Editar',
                icon: 'pi pi-fw pi-pencil',
                commnad: () => {this.showEdit()}
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-fw pi-trash',
                commnad: () => {this.delete()}
            }
        ];

        this.productStore = new ProductStore();
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);

        this.footer = (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
            </div>
        );
    }

    componentDidMount(){
        this.productStore.getAll().then(data => this.setState({products: data}));
    }

    save(){
        this.productStore.save(this.state.product).then(data => {
            this.setState({
                visible: false,
                product: {
                    id: null,
                    name: null,
                    brand: null,
                    madein: null,
                    price: null
                }
            });
        });

        this.growl.show({severity: 'success', summary: 'Correct submission!', detail: 'Register saved correctly'});
        this.productStore.getAll().then(data => this.setState({products: data}));
    }

    delete(){
        if(window.confirm("Are you sure you want to delete this register?")){
            this.productStore.delete(this.state.selectedProduct.id).then(data => {
                this.growl.show({severity: 'success', summary: 'Deleted', detail: 'Register deleted correctly'});
                this.productStore.getAll().then(data => this.setState({products: data}));
            });
        }
    }

    render(){
        return(
            <div style={{width: '80%', margin: '0 auto', marginTop: '20px'}}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Vise Project">
                    <DataTable value={this.state.products} selectionMode="single" selection={this.state.selectedProduct} onSelectionChange={e => this.setState({selectedProduct: e.value})}>
                        <Column field="id" header="ID"></Column>
                        <Column field="name" header="NAME"></Column>
                        <Column field="brand" header="BRAND"></Column>
                        <Column field="madein" header="MADE IN"></Column>
                        <Column field="price" header="PRICE"></Column>
                    </DataTable>
                </Panel>
                <Dialog header="Agregar Producto" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
                    <form id="product-form">
                        <span className='p-float-label'>
                            <InputText value={this.state.product.name} id="name" style={{width : '100%'}} onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let product = Object.assign({}, prevState.product);
                                    product.name = val;

                                    return { product };
                                })}
                            } />
                            <label htmlFor='name'>Name</label>
                    </span>

                        <span className='p-float-label'>
                            <InputText value={this.state.product.brand} id="brand" style={{width : '100%'}} onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let product = Object.assign({}, prevState.product);
                                    product.brand = val;

                                    return { product };
                                })}
                            } />
                            <label htmlFor='brand'>Brand</label>
                        </span>

                        <span className='p-float-label'>
                            <InputText value={this.state.product.madein} id="madein" style={{width : '100%'}} onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let product = Object.assign({}, prevState.product);
                                    product.madein = val;

                                    return { product };
                                })}
                            } />
                            <label htmlFor='madein'>Made in</label>
                        </span>

                        <span className='p-float-label'>
                            <InputText value={this.state.product.price} id="price" style={{width : '100%'}} onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let product = Object.assign({}, prevState.product);
                                    product.price = val;

                                    return { product };
                                })}
                            } />
                            <label htmlFor='price'>Price</label>
                    </span>
                  </form>
                </Dialog>
                <Growl ref={(el) => this.growl = el} />
            </div>
        );
    }

    showCreate(){
        this.setState({
            visible: true,
            product: {
                id: null,
                name: null,
                brand: null,
                madein: null,
                price: null
            }
        });
        document.getElementById('product-form').reset();
    }

    showEdit(){
        this.setState({
            visible: true,
            product: {
                id: this.state.selectedProduct.id,
                name: this.state.selectedProduct.name,
                brand: this.state.selectedProduct.brand,
                madein: this.state.selectedProduct.madein,
                price: this.state.selectedProduct.price
            }
        })
    }
}