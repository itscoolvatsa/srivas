package com.srivas.service.customer;

import com.srivas.dto.customer.CustomerDto;
import com.srivas.dto.customer.PackageDto;
import com.srivas.model.CustomerModel;
import com.srivas.model.PackageModel;
import com.srivas.repository.ICustomerRepo;
import com.srivas.repository.IPackageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements ICustomerService {
    @Autowired
    private ICustomerRepo customerRepo;
    @Autowired
    private IPackageRepo packageRepo;

    @Override
    public String createCustomer(CustomerDto customerDto) {
        CustomerModel customerModel = customerDto.createCustomerModel();
        CustomerModel count = customerRepo.findCustomerByEmail(customerModel.getEmail());

        if (count != null) {
            return null;
        }

        return customerRepo
                .save(customerDto.createCustomerModel())
                .getId();
    }

    @Override
    public CustomerModel signInCustomer(String customerEmail) {
        return customerRepo.findCustomerByEmail(customerEmail);
    }

    @Override
    public PackageModel addPackageByCustomerId(String id, PackageDto packageDto) {
        return null;
    }
}
