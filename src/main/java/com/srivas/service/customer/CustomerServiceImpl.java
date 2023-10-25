package com.srivas.service.customer;

import com.srivas.dto.customer.CustomerDto;
import com.srivas.dto.customer.PackageDto;
import com.srivas.dto.customer.UpdatePackageDto;
import com.srivas.model.CustomerModel;
import com.srivas.model.PackageModel;
import com.srivas.repository.ICustomerRepo;
import com.srivas.repository.IPackageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

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
        Optional<CustomerModel> customerModel = customerRepo.findById(id);

        if (customerModel == null) {
            return null;
        }

        PackageModel packageModel = PackageModel
                .builder()
                .name(packageDto.getName())
                .totalView(packageDto.getTotalView())
                .remainingView(packageDto.getTotalView())
                .postedOn(new Date())
                .build();

        packageModel = packageRepo.save(packageModel);
        CustomerModel updatedCustomer = customerModel.get();
        updatedCustomer.setPackageModel(packageModel);

        customerRepo.save(updatedCustomer);
        return packageModel;
    }

    @Override
    public PackageModel updatePackageByCustomerId(String id) {
        Optional<CustomerModel> customerModel = customerRepo.findById(id);
        Optional<PackageModel> packageModel = packageRepo.findById(customerModel.get().getPackageModel().getId());

        if (customerModel == null || packageModel == null) {
            return null;
        }

        PackageModel packageModel1 = packageModel.get();
        int remainingViews = packageModel1.getRemainingView();
        remainingViews --;
        packageModel1.setRemainingView(remainingViews);

        packageModel1 = packageRepo.save(packageModel1);

        return packageModel1;
    }

    @Override
    public PackageModel getPackageByCustomerId(String id) {
        if (customerRepo.findById(id).isEmpty()){
            return null;
        }
        return customerRepo.findById(id).get().getPackageModel();
    }
}
