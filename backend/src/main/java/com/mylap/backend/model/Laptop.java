package com.mylap.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "laptops")
public class Laptop {

    @Id
    private String id;

    private String brand;
    private int price;

    public Laptop() {
    }

    public Laptop(String brand, int price) {
        this.brand = brand;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public String getBrand() {
        return brand;
    }

    public int getPrice() {
        return price;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}